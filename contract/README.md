# This contract registers match results for the given tournament.

## Storage

It uses event logs to store results in a compact format inside an uint  
From first to last bit  
* 128: Match ID  
* 60: empty space  
* 32: team 1 ID  
* 2: team 1 points  
* 32: team 2 ID  
* 2: team 2 points  

## Registration process

First a team has to be registered to generate it's team ID, team names can be looked up with a call to the public mapping "teams" and the ID  

A tournament also has to be registered, an event will be loged with it's ID and name.  

To register a match the tournament and both teams IDs are needed, to call the function this data has to be in a special format  
From first to last bit  
* 32: tournament ID
* 32: team 1 ID
* 32: team 2 ID
* 2: a number, 1 if team 1 won, 2 if team 2 won and 0 for a draw

