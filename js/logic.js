const baseSpriteURL = 'https://img.pokemondb.net/sprites/ruby-sapphire/normal/'
const pokemonNames = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran♀', 'Nidorina', 'Nidoqueen', 'Nidoran♂‚', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', "Farfetch'd", 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo', 'Mew'];
var generatedTeams = 0;

function getPokemonID(allowWildcard){
	let maxID = 150;
	if(allowWildcard == true){
		maxID = 152;
	}
	return Math.floor(Math.random() * (maxID - 1) + 1);
}

//spin the wheel of chance, generate your team and update the label of how many times it's been done
function getNewTeam(){
	let spin = $('#use_delay').prop('checked');
	if(spin == true){
		for(let i = 0; i < 2500; i++){
			setTimeout(function(){
				generateTeam();
			},500);
		}
	}
	else{
		generateTeam();
	}
	
	generatedTeams++;
	$('#team_info').html('You have generated ' + generatedTeams + ' team' + ((generatedTeams == 0 || generatedTeams > 1) ? 's.' : '.'));
}

//get an array of 6 ids to use to show the team
function generateTeam(){
	let team = [];
	let allowWildcard = $('#allow_wildcard').prop('checked');
	let forceKarp = $('#force_karp').prop('checked');
	for(let i = 0; i < 6; i++){
		if(i == 0){
			team[i] = getPokemonID(allowWildcard);
		}
		else{
			let id = getPokemonID(allowWildcard);
			
			while(true){
				if(team.includes(id)){
					//get a new ID until we find one not already in the team
					id = getPokemonID(allowWildcard);
				}
				else{
					team[i] = id;
					break;
				}
			}
		}
	}
	if(forceKarp){
		team = replaceWithKarp(team);
	}
	
	outputTeam(team);
}

//replace a random team member with a magikarp as punishment
function replaceWithKarp(team){
	let slot = Math.floor(Math.random() * (5 - 0) + 1);
	team[slot] = 129;
	
	return team;
}

//display the team with the corresponding name and image
function outputTeam(team){
	let teamElements =  [''];
	
	for(let i = 0; i < team.length; i++){
		if(team[i] == 29){
			teamElements[i] = pokemonNames[team[i] - 1] + '<br/><img src="' + baseSpriteURL + 'nidoran-f' + '.png" alt="' + pokemonNames[team[i] - 1] + '"/>'; 
		}
		else if(team[i] == 32){
			teamElements[i] = pokemonNames[team[i] - 1] + '<br/><img src="' + baseSpriteURL + 'nidoran-m' + '.png" alt="' + pokemonNames[team[i] - 1] + '"/>'; 
		}
		else if(team[i] == 83){
			teamElements[i] = pokemonNames[team[i] - 1] + '<br/><img src="' + baseSpriteURL + 'farfetchd' + '.png" alt="' + pokemonNames[team[i] - 1] + '"/>'; 
		}
		else if(team[i] == 122){
			teamElements[i] = pokemonNames[team[i] - 1] + '<br/><img src="' + baseSpriteURL + 'mr-mime' + '.png" alt="' + pokemonNames[team[i] - 1] + '"/>'; 
		}
		else if(team[i] == 150 || team[i] == 151){
			teamElements[i] = 'Wildcard!<br/><img style="width:64px;height:64px" src="https://img.pokemondb.net/sprites/home/normal/unown-qm.png" alt="Wildcard!"/>';
		}
		else{
			teamElements[i] = pokemonNames[team[i] - 1] + '<br/><img src="' + baseSpriteURL + pokemonNames[team[i] - 1].toLowerCase() + '.png" alt="' + pokemonNames[team[i] - 1] + '"/>'; 
		}
		
		$('#party_' + (i + 1)).html(teamElements[i]);
	}
}

