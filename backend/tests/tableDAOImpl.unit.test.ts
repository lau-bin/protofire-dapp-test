import { MatchData, TableDAO } from "../src/dao/tableDAO";
import { TableDAOImpl } from "src/dao/tableDAOImpl";
import { test, expect, jest, beforeEach } from "@jest/globals";
import Eth from "web3-eth";
import Web3 from "web3";
import { DAOConfig } from "src/config";
import { inject, injectable, singleton } from "tsyringe";
import BN from "bn.js";
import "tests/custom.matchers";

jest.mock('web3-eth', () => {
  return jest.fn().mockImplementation(() => {
    return {
      Contract: jest.fn().mockImplementation(() => {
        return {
          methods: {
            tournaments: () => ({ call: () => Promise.resolve("tournament1") }),
            deletionTimeframeMaxMinutes: () => ({ call: () => Promise.resolve(new BN(1)) }),
            teams: () => ({ call: () => Promise.resolve("team1") }),
            getTeamNames: () => ({ call: () => Promise.resolve({ 0: ["team1"], 1: [new BN(1)] }) }),
            tournamentIndex: () => ({ call: () => Promise.resolve(new BN(1)) }),
            matchId: () => ({ call: () => Promise.resolve(new BN(1)) })
          },
          getPastEvents: (eventName: string) => {
            if (eventName === "RegisterMatch") {
              return Promise.resolve([
                {
                  returnValues: {
                    data: "0x100000000000000000000000000000000000000000000000000000500000002B"
                  }
                },
                {
                  returnValues: {
                    data: "0x100000000000000000000000000000000000000000000000000000500000002B"
                  }
                }
              ])
            }
            else if (eventName === "DeleteMatch") {
              return Promise.resolve([
                {
                  returnValues: {
                    id: "0x10000000000000000000000000000000"
                  }
                },
                {
                  returnValues: {
                    id: "0x10000000000000000000000000000000"
                  }
                },
                {
                  returnValues: {
                    id: "0x11000000000000000000000000000000"
                  }
                }
              ])
            }
          },

        }
      }),
      getBlockNumber: () => Promise.resolve(1)
    };
  });
});
jest.mock("src/config");
jest.mock("tsyringe", () => {
  return {
    singleton: jest.fn(() => () => { }),
    inject: jest.fn(() => () => { }),
    injectable: jest.fn(() => () => { })
  }
});
jest.mock('web3', () => {
  return {
    providers: {
      HttpProvider: jest.fn(() => { })
    }
  }
});
beforeEach(() => {
  (Eth as any).mockClear();
  (Web3.providers.HttpProvider as any).mockClear();
});

test('DAO functions', async () => {
  let tableDAO = new TableDAOImpl(new DAOConfig()) as TableDAO
  expect(await tableDAO.getLastTournamentId()).toBe(1);
  expect(await tableDAO.getLastBlock()).toBe(1);
  expect(await tableDAO.getLastMatchId()).toBe(BigInt(1));
  expect(await tableDAO.getMaxTimeframeForUpdate()).toBe(1);
  expect(await tableDAO.getTeamName(1)).toBe("team1");
  expect(await tableDAO.getTeamNames([1])).toEqual({ names: ["team1"], ids: [1] });
  expect(await tableDAO.getTournamentName(1)).toBe("tournament1");
  let matchData = await tableDAO.getMatchData(1, 0, 50);
  matchData.matches.forEach(el => el.data.sort());
  expect(matchData).toMatchObject({
    id: 1,
    matches: expect.anything()
  });
  let data1 = matchData.matches[0].data;
  matchData.matches[0].data = [];
  let data2 = matchData.matches[1].data;
  matchData.matches[1].data = [];
  //@ts-ignore
  expect(data1).toContainSameMembers([
    {
      id: 10,
      score: 3
    },
    {
      id: 5,
      score: 0
    }
  ]);
  //@ts-ignore
  expect(data2).toContainSameMembers([
    {
      id: 10,
      score: 3
    },
    {
      id: 5,
      score: 0
    }
  ]);
  //@ts-ignore
  expect(matchData.matches).toContainSameMembers([
    {
      id: BigInt("0x10000000000000000000000000000000"),
      data: []
    },
    {
      id: BigInt("0x10000000000000000000000000000000"),
      data: []
    }
  ]);
  //@ts-ignore
  expect(await tableDAO.getDeletedMatches(1, 0, 50)).toContainSameMembers([
    BigInt("0x11000000000000000000000000000000"),
    BigInt("0x10000000000000000000000000000000"),
    BigInt("0x10000000000000000000000000000000")
  ]);
});
