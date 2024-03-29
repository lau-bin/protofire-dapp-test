//SPDX-License-Identifier: Academic Free License v1.1
pragma solidity >=0.8.9 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Records the results of matches of a sports league
/// @author Lautaro C
contract Register is Ownable {

  mapping (uint => string) public teams;
  mapping (uint => string) public tournaments;
  uint teamIndex;
  uint public tournamentIndex;
  uint public matchId;
  uint public deletionTimeframeMaxMinutes;

  event RegisterMatch(uint indexed tournamentId, uint data);
  event DeleteMatch(uint indexed tournamentId, uint id);

  /// @param deletionTimeframe uint, set the timeframe in minutes where a match result can be deleted
  /// @notice caller will become the owner
  constructor(uint deletionTimeframe){
    deletionTimeframeMaxMinutes = deletionTimeframe;
  }

  /// @param _tournamentId uint32
  /// @param _matchId uint
  /// @notice can only be called by the owner
  function deleteMatch(uint _tournamentId, uint _matchId) external onlyOwner {
    require(_matchId < matchId, "inexistent match id");
    require(_tournamentId < tournamentIndex, "inexistent tournament id");
    emit DeleteMatch(_tournamentId, _matchId);
  }

  /// @param data uint, composed by 2^128(match id) 2^32(team 1 id) 2^32(team 2 id) 2^2(winner team, can be 2 for team 2, 1 for team 1 or 0 for a draw)
  /// @notice can only be called by the owner
  function registerMatch(uint data) external onlyOwner {
    require(matchId < 0x100000000000000000000000000000000, "limit of registrations reached (2^128)");

    uint team1Id = (data&uint(0x3FFFFFFFC00000000))>>34;
    uint team2Id = (data&uint(0x3FFFFFFFC))>>2;
    uint winner = data&uint(0x3);
    uint tournamentId = data>>66;
    uint result;

    require(team1Id < 0x100000000, "team1 id too big");
    require(team2Id < 0x100000000, "team2 id too big");
    require(winner < 3, "wrong winner data");
    require(tournamentId < 0x100000000, "tournament id too big");
    result = matchId++;
    result = result<<60;
    if (winner == 1){
      result = result|team1Id;
      result = result<<2;
      result = result|uint(0x3);
      result = result<<32;
      result = result|team2Id;
      result = result<<2;
    }
    else if (winner == 2){
      result = result|team2Id;
      result = result<<2;
      result = result|uint(0x3);
      result = result<<32;
      result = result|team1Id;
      result = result<<2;
    }
    else{
      result = result|team2Id;
      result = result<<2;
      result = result|uint(0x1);
      result = result<<32;
      result = result|team1Id;
      result = result<<2;
      result = result|uint(0x1);
    }
    emit RegisterMatch(tournamentId, result);
  }

  /// @param name string, the name of the team
  /// @notice can only be called by the owner
  function registerTeam(string calldata name) external onlyOwner {
    require(teamIndex < 0x100000000, "limit of team registrations reached (2^32)");
    teams[teamIndex++] = name;
  }

  /// @param name string, the name of the tournament
  /// @notice can only be called by the owner
  function registertournament(string calldata name) external onlyOwner {
    require(tournamentIndex < 0x100000000, "limit of tournament registrations reached (2^32)");
    tournaments[tournamentIndex++] = name;
  }

  /// @param _ids uint32[], the teams ids
  /// @notice can only be called by the owner
  function getTeamNames(uint[] calldata _ids) external view returns (string[] memory, uint[] calldata){
    string[] memory teamNames = new string[](_ids.length);
    for (uint i = 0; i < _ids.length; i++){
      teamNames[i] = teams[_ids[i]];
    }
    return (teamNames, _ids);
  }

}