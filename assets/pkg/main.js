var tot_floors = 10;
var cur_floor = 0;
var cur_spot = 0;
var torch_life = 30;
var encounter_meter = 20;
var encounter_chance = 1;
var gm_difficulty = 2;
var gm_difficulty_n = ["Easy","Normal","Hard"];
var gm_story_tracker_prog = 0;
var gm_tower_map = [];

var gm_tower_obj_0 = [];
var gm_tower_obj_1 = [];
var gm_tower_obj_2 = [];
var gm_tower_obj_3 = [];

var gm_tower_obj_0_a = [];
var gm_tower_obj_1_a = [];
var gm_tower_obj_2_a = [];
var gm_tower_obj_3_a = [];

var gm_tower_obj_0_i = [];
var gm_tower_obj_1_i = [];
var gm_tower_obj_2_i = [];
var gm_tower_obj_3_i = [];


var obj_types_id = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
var obj_types_names_id = ["Nothing","Chest","Barrel","Anvil", "Bookshelf","Clock","Dresser","Wardrobe","Fireplace","Globe","Guillotine","Keg","Lecturn","Telescope","Vase","Mirror","Pillar","Table","Pillory","Stove"];
var obj_types_names_st = ["Closed","Open","Smashed"];
var obj_type_noise_f = [0,2,1];

var sce_room_id = [1,2];
var sce_room_id_n = ["Room type 1","Room type 2"];

var obj_items_id = [0,1,2,3,4];
var obj_items_names_id = ["Nothing","Food","Weapon","Armour","Coin","Food","Food","Nothing","Coin","Coin"];
var obj_items_perks_n = [0,2,1,2,2];

var obj_weapon_id = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var obj_weapon_name_id = ["Sword","Axe","Club","Skylas","Pan","HockeyStick","Hoe","Maul","Spikey","Prong","Pitchfork","Rake","Scythe","Trident","Sledgehammer"];
var obj_weapon_damage_n = [4,3,2,8,5,7,3,5,9,3,3,3,6,8,12];
var obj_weapon_damage_c = [3000,2000,1000,6000,3000,3000,2000,5000,5000,3000,3000,2000,4000,4000,6000];
var obj_weapon_damage_a = [2,2,1];

var ent_enemies_id = [1,2,3,4,5,6,7,8,9,10,11,12,13];
var ent_enemies_name_id = ["Ghost","Snake","Glarb","Serpant","Dragon","Duck","Ember","Goblin","Grable","Octopus","Ooze","Skeleton","Toad"];
var ent_enemies_damage_n = [2,1,3,4,8,2,3,5,4,4,3,2,3];
var ent_enemies_health_n = [4,2,6,8,16,3,6,9,10,12,15,3,5];
var ent_enemies_attack_s = [2000,2000,3000,4000,7000,3000,3000,4000,5000,6000,2000,3000,2000];
var ent_enemies_points_d = [50,25,75,100,250,25,35,60,75,80,40,25,25]; 

var ent_boss_id = [1,2,3,4];
var ent_boss_name_id = ["Rakoll, Dishonoured  Baron","Muletta, The Juggernaut","Rufri, Deprived Priest,","Ilpotta, Underworld Souless Eater"];
var ent_boss_damage_n = [2,1,3,4];
var ent_boss_health_n = [4,2,6,8];
var ent_boss_attack_s = [2000,2000,3000,4000];
var ent_boss_points_d = [250,500,750,1000]; 

var isdevmode = 0;
var isinbattle = 0;
var ismobile = 0;

var enemy_speed = 2000;
let intervaltest = setInterval(Enemy_Attack(), enemy_speed);

var player = {
    score: 0,
    max_health: 10,
    cur_health: 10,
    max_armour: 10,
    cur_armour: 0,
    weapon_id: 0,
    cur_weapon: 0,
    wpn_dmg: 0,
    wpn_cool_dwn: 0,
    has_armour: 0,
    has_key: 0,
    food: 0,
    coin: 0,
    called_act_1: 0,
    called_act_2: 0,
    called_act_3: 0,
    called_act_4: 0,
    wpn_found: 0

};

var enemy = {
    id: 0,
    health: 10,
    damange: 0,
    speed: 10000,
    cur_health: 0,
    cur_armour: 0
};



function start_game() {
    var x1 = document.getElementById("tower_size").value;
    var x2 = document.getElementById("difficulty").value;

    tot_floors = x1;
    gm_difficulty = x2;

    document.getElementById("output").innerHTML = "Generating Scenario. Please Wait...";
    //tower_generator
    //document.getElementById("tower_generator").disabled = true;
    //document.getElementById("tower_size").disabled = true;
    //document.getElementById("difficulty").disabled = true;
    //const myTimeout = setTimeout(Game_Manager, 5000);
    Generate_Tower();
    UI_Load_Map();
    UIX(1);
}

function Game_Manager(gm_story_tracker_prog) {//the story manager
    if(gm_story_tracker_prog == 0) {
        /*You start your adventure. this will be a basic story tracker feature....*/
        document.getElementById("rpg_window_confirmation").style.display = "block";
        document.getElementById("output_title").innerHTML = "The Story Begins";
        document.getElementById("output").innerHTML = "You awaken at the bottom of the pit you fell into. Dazed, and a little scuffed up you eventually come to. In front you find a ladder and a " + player.cur_weapon + " looks like the only way is up...";
    }

    if(gm_story_tracker_prog == 1) {
        /*You have found the key to progress to the final boss room*/
        document.getElementById("rpg_window_confirmation").style.display = "block";
        document.getElementById("output_title").innerHTML = "The Dark Key...";
        document.getElementById("output").innerHTML = "As you go through the  chest, you discover a mystical glowing key shimmering with power. Whereever this key leads to must be hiding something extremely valuable..."
    }

    if(gm_story_tracker_prog == 2) {
        /*You enter the final room and find the boss*/
        document.getElementById("rpg_window_confirmation").style.display = "block";
        document.getElementById("output_title").innerHTML = "The Door";
        document.getElementById("output").innerHTML = "As you bring the key to the lock it begins to glow. You insert the key and hear the mechanisim release allowing you to open the door with ease. In front of you is a throne with someone occupying it. They proceed to grab their weapon and charge you.";
    }

    if(gm_story_tracker_prog == 3) {
        /*You defeat the final boss and discover the exit out*/
        document.getElementById("rpg_window_confirmation").style.display = "block";
        document.getElementById("output_title").innerHTML = "A Happy Ending";
        document.getElementById("output").innerHTML = "";
    }

    if(gm_story_tracker_prog == 4) {
        /*You are defeated you lose the game!*/
        document.getElementById("rpg_window_confirmation").style.display = "block";
        document.getElementById("output_title").innerHTML = "Game Over!";
        document.getElementById("output").innerHTML = "";
    }

    if(gm_story_tracker_prog == 5) {
        /*You try to go to the top floor without the key!*/
        document.getElementById("rpg_window_confirmation").style.display = "block";
        document.getElementById("output_title").innerHTML = "A Locked Door";
        document.getElementById("output").innerHTML = "Looks like the next floor access door is locked. You will need to find a key. It must be somewhere....";
    }

    if(gm_story_tracker_prog == 6) {
        /*You find a weapon!*/

        document.getElementById("bttn_confirm_ok").style.display = "none";
        document.getElementById("rpg_window_confirmation").style.display = "block";
        document.getElementById("output_title").innerHTML = "A New Weapon";
        document.getElementById("output").innerHTML = "You have found a " + obj_weapon_name_id[player.wpn_found] + ". Looks to be in decent shape, would you like to swap?" + 
        "<button onclick='Wpn_Swap()'>Swap</button><button onclick='UIX(3)'>Don't Swap</button>";
    }
}

function Generate_Tower() {
    player.score = 0;
    cur_floor = 0;
    cur_spot = 4;
    gm_tower_obj_0.length = 0;
    gm_tower_obj_1.length = 0;
    gm_tower_obj_2.length = 0;
    gm_tower_obj_3.length = 0;

    gm_tower_obj_0_a.length = 0;
    gm_tower_obj_1_a.length = 0;
    gm_tower_obj_2_a.length = 0;
    gm_tower_obj_3_a.length = 0;

    gm_tower_obj_0_i.length = 0;
    gm_tower_obj_1_i.length = 0;
    gm_tower_obj_2_i.length = 0;
    gm_tower_obj_3_i.length = 0;

    for (var i = 0; i < tot_floors; i++) {
        /*Getting Floor Needing to generate*/
            
        /*Roll Room Type Starts*/
        
        //roll the room type from scene room ids...
        var xx1 = Math.floor((Math.random() * sce_room_id.length));
        //push to array
        gm_tower_map.push(sce_room_id[xx1]);

        /*Roll Room Type Ends (SuPeR bAsIc!)*/

        /*Roll for Item Types Starts! (oooooooo!)*/
        
        /*Roll Item 1 type*/
        var xx2 = Math.floor((Math.random() * obj_types_id.length));
        gm_tower_obj_0.push(obj_types_names_id[xx2]);
        gm_tower_obj_0_a.push(0);
         
        /*Roll Item 2 type*/
        var xx3 = Math.floor((Math.random() * obj_types_id.length));
        gm_tower_obj_1.push(obj_types_names_id[xx3]);
        gm_tower_obj_1_a.push(0);

        /*Roll Item 3 type*/
        var xx4 = Math.floor((Math.random() * obj_types_id.length));
        gm_tower_obj_2.push(obj_types_names_id[xx4]);
        gm_tower_obj_2_a.push(0);

        /*Roll Item 4 type*/
        var xx5 = Math.floor((Math.random() * obj_types_id.length));
        gm_tower_obj_3.push(obj_types_names_id[xx5]);
        gm_tower_obj_3_a.push(0);

        /*Roll for Item Types Ends!*/


        /*Roll for lootables starts*/
        // obj_items_names_id obj_items_id
        var xx6 = Math.floor((Math.random() * obj_items_id.length));
        gm_tower_obj_0_i.push(obj_items_names_id[xx6]);

        var xx7 = Math.floor((Math.random() * obj_items_id.length));
        gm_tower_obj_1_i.push(obj_items_names_id[xx7]);

        var xx8 = Math.floor((Math.random() * obj_items_id.length));
        gm_tower_obj_2_i.push(obj_items_names_id[xx8]);

        var xx9 = Math.floor((Math.random() * obj_items_id.length));
        gm_tower_obj_3_i.push(obj_items_names_id[xx9]);
        

        
    }

    /*Once Finished, change the starting room to 0 to trigger that room and the final floor to b for boss....*/
    gm_tower_map[0] = 0;
    gm_tower_obj_0[0] = obj_types_names_id[0];
    gm_tower_obj_1[0] = obj_types_names_id[0];
    gm_tower_obj_2[0] = obj_types_names_id[0];
    gm_tower_map[tot_floors] = 'b';
    gm_tower_obj_0[tot_floors] = obj_types_names_id[0];
    gm_tower_obj_1[tot_floors] = obj_types_names_id[0];
    gm_tower_obj_2[tot_floors] = "Door";
    gm_tower_obj_3[tot_floors] = obj_types_names_id[0];
    gm_tower_obj_3[0] = "Door";

    /*After it overrides everything, we will focus on what the player gets for a weapon as well...*/
    var yy1 = Math.floor((Math.random() * obj_weapon_id.length));
    player.cur_weapon = obj_weapon_name_id[yy1];
    player.wpn_dmg = obj_weapon_damage_n[yy1];
    player.wpn_cool_dwn = obj_weapon_damage_c[yy1];
    player.weapon_id = yy1;


    //Add the key
    var yy2 = Math.floor((Math.random() * 4) + 1);
    var yy3 = Math.floor((Math.random() * (tot_floors - 1)) + 1);

    if(yy2 == 1) {
        gm_tower_obj_0_i[yy3] = "Key";
        gm_tower_obj_0[yy3] = "Chest";
    }

    if(yy2 == 2) {
        gm_tower_obj_1_i[yy3] = "Key";
        gm_tower_obj_1[yy3] = "Chest";
    }

    if(yy2 == 3) {
        gm_tower_obj_2_i[yy3] = "Key";
        gm_tower_obj_2[yy3] = "Chest";
    }

    if(yy2 == 4) {
        gm_tower_obj_3_i[yy3] = "Key";
        gm_tower_obj_3[yy3] = "Chest";
    }

    /*Finally, we will exit this routine and jump into the game manager and tell it to give output and to Load the UI.*/
    gm_story_tracker_prog = 0;
    Game_Manager(0);
}

function Game_Command(com) {
    if(isinbattle == 0) {
        if(com == 1) {
            /*Up Command*/
            if(cur_floor != (tot_floors - 1)) {
                if(cur_spot == 0) {
                    if(cur_floor != tot_floors) {
                        cur_floor += 1;
                    }
                }
            } else {
                if(player.has_key == 1) {
                    if(cur_spot == 0) {
                        cur_floor += 1;
                    }
                } else {
                    Game_Manager(5);
                }
            }
        }

        if(com == 2) {
            /*Down Command*/
            if(cur_floor != 0) {
                if(cur_spot == 0) {
                    cur_floor -= 1;
                }
            }
        }

        if(com == 3) {
            /*Right Command*/
            if(cur_spot != 4) {
                cur_spot += 1;
            }
        }

        if(com == 4) {
            /*Left Command*/
            if(cur_spot != 0) {
                cur_spot -= 1;
            }
        }

        if(com == 5) {
            /*Open Command*/
            if(cur_spot != 0) {
                if(cur_spot == 1) {
                    if(gm_tower_obj_0[cur_floor] != "Nothing") {
                        if(gm_tower_obj_0_a[cur_floor] != 2) {
                            gm_tower_obj_0_a[cur_floor] = 1;
                            Lootable(1);
                            //Encounter_Meter(1);
                        }
                    }
                }
                if(cur_spot == 2) {
                    if(gm_tower_obj_1[cur_floor] != "Nothing") {
                        if(gm_tower_obj_1_a[cur_floor] != 2) {
                            gm_tower_obj_1_a[cur_floor] = 1;
                            Lootable(1);
                            //Encounter_Meter(1);
                        }
                    }
                }
                if(cur_spot == 3) {
                    if(gm_tower_obj_2[cur_floor] != "Nothing") {
                        if(gm_tower_obj_2_a[cur_floor] != 2) {
                            gm_tower_obj_2_a[cur_floor] = 1;
                            Lootable(1);
                            //Encounter_Meter(1);
                        }
                    }
                }
                if(cur_spot == 4) {
                    if(gm_tower_obj_3[cur_floor] != "Nothing") {
                        if(gm_tower_obj_3_a[cur_floor] != 2) {
                            gm_tower_obj_3_a[cur_floor] = 1;
                            Lootable(1);
                            //Encounter_Meter(1);
                        }
                    }
                }
            }
            //GM_Disturb(0);
        }

            if(com == 6) {
                /*Smash Command*/
                if(cur_spot != 0) {
                    if(cur_spot == 1) {
                        if(gm_tower_obj_0[cur_floor] != "Nothing") {
                            if(gm_tower_obj_0_a[cur_floor] != 1) {
                                gm_tower_obj_0_a[cur_floor] = 2;
                                Lootable(2);
                                //Encounter_Meter(2);
                            }
                        }
                    }
                    if(cur_spot == 2) {
                        if(gm_tower_obj_1[cur_floor] != "Nothing") {
                            if(gm_tower_obj_1_a[cur_floor] != 1) {
                                gm_tower_obj_1_a[cur_floor] = 2;
                                Lootable(2);
                                //Encounter_Meter(2);
                            }
                        }
                    }
                    if(cur_spot == 3) {
                        if(gm_tower_obj_2[cur_floor] != "Nothing") {
                            if(gm_tower_obj_2_a[cur_floor] != 1) {
                                gm_tower_obj_2_a[cur_floor] = 2;
                                Lootable(2);
                                //Encounter_Meter(2);
                            }
                        }
                    }
                    if(cur_spot == 4) {
                        if(gm_tower_obj_3[cur_floor] != "Nothing") {
                            if(gm_tower_obj_3_a[cur_floor] != 1) {
                                gm_tower_obj_3_a[cur_floor] = 2;
                                Lootable(2);
                                //Encounter_Meter(2);
                            }
                        }
                    }
                }
            //GM_Disturb(1);
        }
    }

    UI_Load_Map();
}

function UI_Load_Map() {

    document.getElementById("score").innerHTML = "Score: " + player.score;
    document.getElementById("floor").innerHTML = "Floor: " + cur_floor;
    document.getElementById("torch_life").innerHTML = "Torch Life: " + torch_life;

    document.getElementById("floor_map").innerHTML = "<img id='spot0' class='plyr_spot'> "+ "<img id='spot1' class='plyr_spot'>" + "<img class='" + gm_tower_obj_0[cur_floor] + " " + obj_types_names_st[gm_tower_obj_0_a[cur_floor]] + "'>" + "<img id='spot2' class='plyr_spot'> " + "<img class='" + gm_tower_obj_1[cur_floor] + " " + obj_types_names_st[gm_tower_obj_1_a[cur_floor]] + "'>"  + "<img id='spot3' class='plyr_spot'> " + "<img class='" + gm_tower_obj_2[cur_floor] + " " + obj_types_names_st[gm_tower_obj_2_a[cur_floor]] + "'>"  + "<img id='spot4' class='plyr_spot'> " + "<img class='" + gm_tower_obj_3[cur_floor] + " " + obj_types_names_st[gm_tower_obj_3_a[cur_floor]] + "'>"  + " ";
     
    document.getElementById("plyr_hud").innerHTML = "<img id='health'><img id='weapon'><img id='armour'>";

    document.getElementById("spot0").classList.add("Nothing");
    document.getElementById("spot1").classList.add("Nothing");
    document.getElementById("spot2").classList.add("Nothing");
    document.getElementById("spot3").classList.add("Nothing");
    document.getElementById("spot4").classList.add("Nothing");

    if(cur_spot == 0) {
        document.getElementById("spot0").classList.add("player");
        document.getElementById("spot0").classList.remove("Nothing");
    }

    if(cur_spot == 1) {
        document.getElementById("spot1").classList.add("player");
        document.getElementById("spot1").classList.remove("Nothing");
    }

    if(cur_spot == 2) {
        document.getElementById("spot2").classList.add("player");
        document.getElementById("spot2").classList.remove("Nothing");
    }

    if(cur_spot == 3) {
        document.getElementById("spot3").classList.add("player");
        document.getElementById("spot3").classList.remove("Nothing");
    }

    if(cur_spot == 4) {
        document.getElementById("spot4").classList.add("player");
        document.getElementById("spot4").classList.remove("Nothing");
    }

    if(ismobile != 0) {
    
        if(cur_spot != 0) {
            document.getElementById("com_up").disabled = true;
            document.getElementById("com_dwn").disabled = true;
        } else {
            document.getElementById("com_up").disabled = false;
            document.getElementById("com_dwn").disabled = false;
        }
    }

    if(ismobile == 0) {
        document.getElementById("com_up").style.display = "none";
        document.getElementById("com_dwn").style.display = "none";
        document.getElementById("com_lft").style.display = "none";
        document.getElementById("com_rht").style.display = "none";
        document.getElementById("com_opn").style.display = "none";
        document.getElementById("com_smh").style.display = "none";
    }


    document.getElementById("bgimg").classList.add("tower_test");


    //var obj_weapon_name_id = ["Sword","Axe","Club","Dual Swords","Pan","HockeyStick","Hoe","Maul","Morning Star","Pickle Fork","Pitch Fork","Rake","Scythe","Trident","War Hammer"];

    if(player.has_armour == 0) {
        document.getElementById("armour").classList.add("Nope");
    }

    if(player.has_armour == 1) {
        document.getElementById("armour").classList.add("Shield");
    }

    document.getElementById("weapon").classList.add(player.cur_weapon);

    document.getElementById("health").classList.add("Health");

}

function Lootable(player_action) {

    //"Nothing","Food","Weapon","Armour","Coin","Food","Food","Nothing","Coin","Coin"

    if(player_action == 1) {
        if(cur_spot == 1) {
            if(gm_tower_obj_0_i[cur_floor] == "Nothing") {
                //do nothing or kill it with fire according to nick idefka!!!!
                Encounter_Meter(1);
            }

            if(gm_tower_obj_0_i[cur_floor] == "Coin") {
                if(gm_difficulty == 1) {
                    player.coin += 1;
                    player.score += 5;
                    gm_tower_obj_0_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 2) {
                    player.coin += 2;
                    player.score += 10;
                    gm_tower_obj_0_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 3) {
                    var xxx1 = Math.floor((Math.random() * 10));
                    var xxx2 = xxx1 * 5;
                    player.coin += xxx1;
                    player.score += xxx2;
                    gm_tower_obj_0_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }
            }

            if(gm_tower_obj_0_i[cur_floor] == "Food") {
                if(gm_difficulty == 1) {
                    player.food += 1;
                    player.score += 15;
                    gm_tower_obj_0_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 2) {
                    player.food += 2;
                    player.score += 30;
                    gm_tower_obj_0_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 3) {
                    var xxx1 = Math.floor((Math.random() * 5));
                    var xxx2 = xxx1 * 15;
                    player.food += xxx1;
                    player.score += xxx2;
                    gm_tower_obj_0_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }
            }

            if(gm_tower_obj_0_i[cur_floor] == "Armour") {
                if(player.has_armour == 0) {
                    player.has_armour = 1;
                    player.cur_armour = 5;
                    player.max_armour = 5;
                }

                if(player.has_armour != 0) {
                    player.has_armour = 5;
                }

                gm_tower_obj_0_i[cur_floor] = "Nothing";
                Encounter_Meter(1);
            }

            if(gm_tower_obj_0_i[cur_floor] == "Weapon") {
                var yy1 = Math.floor((Math.random() * obj_weapon_id.length));
                player.wpn_found = yy1;
                gm_tower_obj_0_i[cur_floor] = "Nothing";
                Game_Manager(6);
            }

            if(gm_tower_obj_0_i[cur_floor] == "Key") {
                player.has_key = 1;
                gm_tower_obj_0_i[cur_floor] = "Nothing";
                Game_Manager(1);
            }
        }

        if(cur_spot == 2) {
            if(gm_tower_obj_1_i[cur_floor] == "Nothing") {
                //do nothing or kill it with fire according to nick idefka!!!!
                Encounter_Meter(1);
            }

            if(gm_tower_obj_1_i[cur_floor] == "Coin") {
                if(gm_difficulty == 1) {
                    player.coin += 1;
                    player.score += 5;
                    gm_tower_obj_1_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 2) {
                    player.coin += 2;
                    player.score += 10;
                    gm_tower_obj_1_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 3) {
                    var xxx1 = Math.floor((Math.random() * 10));
                    var xxx2 = xxx1 * 5;
                    player.coin += xxx1;
                    player.score += xxx2;
                    gm_tower_obj_1_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }
            }

            if(gm_tower_obj_1_i[cur_floor] == "Food") {
                if(gm_difficulty == 1) {
                    player.food += 1;
                    player.score += 15;
                    gm_tower_obj_1_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 2) {
                    player.food += 2;
                    player.score += 30;
                    gm_tower_obj_1_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 3) {
                    var xxx1 = Math.floor((Math.random() * 5));
                    var xxx2 = xxx1 * 15;
                    player.food += xxx1;
                    player.score += xxx2;
                    gm_tower_obj_1_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }
            }

            if(gm_tower_obj_1_i[cur_floor] == "Armour") {
                if(player.has_armour == 0) {
                    player.has_armour = 1;
                    player.cur_armour = 5;
                    player.max_armour = 5;
                }

                if(player.has_armour != 0) {
                    player.has_armour = 5;
                }

                gm_tower_obj_1_i[cur_floor] = "Nothing";
                Encounter_Meter(1);
            }

            if(gm_tower_obj_1_i[cur_floor] == "Weapon") {
                var yy1 = Math.floor((Math.random() * obj_weapon_id.length));
                player.wpn_found = yy1;
                gm_tower_obj_1_i[cur_floor] = "Nothing";
                Game_Manager(6);
            }

            if(gm_tower_obj_1_i[cur_floor] == "Key") {
                player.has_key = 1;
                gm_tower_obj_1_i[cur_floor] = "Nothing";
                Game_Manager(1);
            }
        }

        if(cur_spot == 3) {
            if(gm_tower_obj_2_i[cur_floor] == "Nothing") {
                //do nothing or kill it with fire according to nick idefka!!!!
                Encounter_Meter(1);
            }

            if(gm_tower_obj_2_i[cur_floor] == "Coin") {
                if(gm_difficulty == 1) {
                    player.coin += 1;
                    player.score += 5;
                    gm_tower_obj_2_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 2) {
                    player.coin += 2;
                    player.score += 10;
                    gm_tower_obj_2_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 3) {
                    var xxx1 = Math.floor((Math.random() * 10));
                    var xxx2 = xxx1 * 5;
                    player.coin += xxx1;
                    player.score += xxx2;
                    gm_tower_obj_2_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }
            }

            if(gm_tower_obj_2_i[cur_floor] == "Food") {
                if(gm_difficulty == 1) {
                    player.food += 1;
                    player.score += 15;
                    gm_tower_obj_2_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 2) {
                    player.food += 2;
                    player.score += 30;
                    gm_tower_obj_2_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 3) {
                    var xxx1 = Math.floor((Math.random() * 5));
                    var xxx2 = xxx1 * 15;
                    player.food += xxx1;
                    player.score += xxx2;
                    gm_tower_obj_2_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }
            }

            if(gm_tower_obj_2_i[cur_floor] == "Armour") {
                if(player.has_armour == 0) {
                    player.has_armour = 1;
                    player.cur_armour = 5;
                    player.max_armour = 5;
                }

                if(player.has_armour != 0) {
                    player.has_armour = 5;
                }

                gm_tower_obj_2_i[cur_floor] = "Nothing";
                Encounter_Meter(1);
            }

            if(gm_tower_obj_2_i[cur_floor] == "Weapon") {
                var yy1 = Math.floor((Math.random() * obj_weapon_id.length));
                player.wpn_found = yy1;
                gm_tower_obj_2_i[cur_floor] = "Nothing";
                Game_Manager(6);
            }

            if(gm_tower_obj_2_i[cur_floor] == "Key") {
                player.has_key = 1;
                gm_tower_obj_2_i[cur_floor] = "Nothing";
                Game_Manager(1);
            }
        }

        if(cur_spot == 4) {
            if(gm_tower_obj_3_i[cur_floor] == "Nothing") {
                //do nothing or kill it with fire according to nick idefka!!!!
                Encounter_Meter(1);
            }

            if(gm_tower_obj_3_i[cur_floor] == "Coin") {
                if(gm_difficulty == 1) {
                    player.coin += 1;
                    player.score += 5;
                    gm_tower_obj_3_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 2) {
                    player.coin += 2;
                    player.score += 10;
                    gm_tower_obj_3_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 3) {
                    var xxx1 = Math.floor((Math.random() * 10));
                    var xxx2 = xxx1 * 5;
                    player.coin += xxx1;
                    player.score += xxx2;
                    gm_tower_obj_3_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }
            }

            if(gm_tower_obj_2_i[cur_floor] == "Food") {
                if(gm_difficulty == 1) {
                    player.food += 1;
                    player.score += 15;
                    gm_tower_obj_3_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 2) {
                    player.food += 2;
                    player.score += 30;
                    gm_tower_obj_3_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }

                if(gm_difficulty == 3) {
                    var xxx1 = Math.floor((Math.random() * 5));
                    var xxx2 = xxx1 * 15;
                    player.food += xxx1;
                    player.score += xxx2;
                    gm_tower_obj_3_i[cur_floor] = "Nothing";
                    Encounter_Meter(1);
                }
            }

            if(gm_tower_obj_3_i[cur_floor] == "Armour") {
                if(player.has_armour == 0) {
                    player.has_armour = 1;
                    player.cur_armour = 5;
                    player.max_armour = 5;
                }

                if(player.has_armour != 0) {
                    player.has_armour = 5;
                }

                gm_tower_obj_3_i[cur_floor] = "Nothing";
                Encounter_Meter(1);
            }

            if(gm_tower_obj_3_i[cur_floor] == "Weapon") {
                var yy1 = Math.floor((Math.random() * obj_weapon_id.length));
                player.wpn_found = yy1;
                gm_tower_obj_3_i[cur_floor] = "Nothing";
                Game_Manager(6);
            }

            if(gm_tower_obj_3_i[cur_floor] == "Key") {
                player.has_key = 1;
                gm_tower_obj_3_i[cur_floor] = "Nothing";
                Game_Manager(1);
            }
        }

    }

    if(player_action == 2) {
        Encounter_Meter(2);
    }
}

function Wpn_Swap() {
    /*
    var yy1 = Math.floor((Math.random() * obj_weapon_id.length));
    player.cur_weapon = obj_weapon_name_id[yy1];
    player.wpn_dmg = obj_weapon_damage_n[yy1];
    player.wpn_cool_dwn = obj_weapon_damage_c[yy1];
    player.weapon_id = yy1;
    */
    player.cur_weapon = obj_weapon_name_id[player.wpn_found];
    player.wpn_dmg = obj_weapon_damage_n[player.wpn_found];
    player.wpn_cool_dwn = obj_weapon_damage_c[player.wpn_found];
    player.weapon_id = player.wpn_found;
    UIX(3);
}

function GM_Disturb() {
    /*The Player has either opened something or smashed it. How many dark elements heard it is the question...*/
    xx10 = Math.floor((Math.random() * encounter_meter));
    if(xx10 < encounter_chance) {
        alert("battle");
        //load the fucking battle
        encounter_chance = 0;
        Encounter(0);
        UIX(2);
    }

    if(xx10 >= encounter_chance) {
        UI_Load_Map();
    }
}

function Encounter_Meter(player_action) {

    if(player_action == 1) {

        if(gm_difficulty == 1) {
            encounter_chance += 1;
            player.score += 10;
        }

        if(gm_difficulty == 2) {
            encounter_chance += 2;
            player.score += 20;
        }

        if(gm_difficulty == 3) {
            encounter_chance += 3;
            player.score += 40;
        }
    }

    if(player_action == 2) {
        
        if(gm_difficulty == 1) {
            encounter_chance += 2;
            player.score += 20;
        }

        if(gm_difficulty == 2) {
            encounter_chance += 4;
            player.score += 40;
        }

        if(gm_difficulty == 3) {
            encounter_chance += 6;
            player.score += 60;
        }
    }
    GM_Disturb();
    //UI_Load_Map();
}

setInterval(Enemy_Attack(), enemy.speed);

function Encounter(modes) {

    if(modes == 0) {
        if(cur_floor != tot_floors) {
            //Regular Encounter Battle

            var xx11 = Math.floor((Math.random() * ent_enemies_id.length));

            enemy.id = ent_enemies_name_id[xx11];
            enemy.health = ent_enemies_health_n[xx11];
            enemy.damange = ent_enemies_damage_n[xx11];
            enemy.cur_health = ent_enemies_health_n[xx11];
            isinbattle = 1;
            document.getElementById("enemy_id_text").innerHTML = "A " + ent_enemies_name_id[xx11] + " appears in front of you...";
            document.getElementById("plyr_weapon_name").innerHTML = player.cur_weapon;

            document.getElementById("enc_plyr_icn").classList.add("player");
            document.getElementById("enc_enmy_icn").classList.add(ent_enemies_name_id[xx11]);

            player.cur_health = player.max_health;
            player.cur_armour = player.max_armour;

            clearInterval(intervaltest);
            enemy_speed = ent_enemies_attack_s[xx11];
            intervaltest = setInterval(Enemy_Attack ,enemy_speed);
            Encounter(1);
        }

        if(cur_floor == tot_floors) {
            //This is the final Boss Battle!
            //PLACEHOLDER! REPLACE WITH BOSS STATS LATER ON!!! ONCE DRAWINGS ARE COMPLETED!!!!!
            var xx11 = Math.floor((Math.random() * ent_enemies_id.length));

            enemy.id = ent_enemies_name_id[xx11];
            enemy.health = ent_enemies_health_n[xx11];
            enemy.damange = ent_enemies_damage_n[xx11];
            enemy.cur_health = ent_enemies_health_n[xx11];
            isinbattle = 1;
            document.getElementById("enemy_id_text").innerHTML = "A " + ent_enemies_name_id[xx11] + " appears in front of you...";

            document.getElementById("enc_plyr_icn").src = char1;

            player.cur_health = player.max_health;
            player.cur_armour = player.max_armour;

            clearInterval(intervaltest);
            enemy_speed = ent_enemies_attack_s[xx11];
            intervaltest = setInterval(Enemy_Attack ,enemy_speed);
            Encounter(1);
        }
    }

    if(modes == 1) {
        if(isinbattle == 1) {
            document.getElementById("plyr_hth").innerHTML = player.cur_health + " / " + player.max_health;
            document.getElementById("plyr_amr").innerHTML = player.cur_armour + " / " + player.max_armour;
            document.getElementById("enmy_hth").innerHTML = enemy.cur_health + " / " + enemy.health;
            document.getElementById("enmy_amr").innerHTML = "0" + " / " + "0";

            if(player.cur_health <= 0) {
                //game over...
                alert("game over! you lose the game!!!!!");
                document.getElementById("enc_enmy_icn").classList.remove(enemy.id);
                isinbattle = 0;
                UIX(0);
            }

            if(enemy.cur_health <= 0) {
                //the enemy is dead...
                if(cur_floor != tot_floors) {
                    //an enemy is just dead continue the game
                    alert("you defeated the enemy! round won!!!");
                    //clearInterval(enemy_timeout);
                    isinbattle = 0;
                    document.getElementById("enc_enmy_icn").classList.remove(enemy.id);
                    UI_Load_Map();
                    UIX(1);

                }

                if(cur_floor == tot_floors) {
                    //the boss is dead you win the game!!!!

                }
            }
        }
    }

    if(modes == 2) {
        //the player attacks with main weapon
        var xx13 = Math.floor((Math.random() * player.wpn_dmg) + 1);
        enemy.cur_health -= xx13;
        document.getElementById("plyr_weapon_name").disabled = true;
        var element = document.getElementById("plyr_weapon_name");
        //element.classList.add("button_re_enable");
        //document.getElementById("plyr_weapon_name").style.animationDuration = obj_weapon_damage_a[player.weapon_id];
        setTimeout(Encounter_Action_main_attack, player.wpn_cool_dwn);

        Encounter(1);
    }

    if(modes == 3) {
        //the player heals... must have food in inventory to heal
        if(player.food >= 1) {
            player.cur_health += 5;
            player.food -= 1;
            document.getElementById("plyr_heal_name").disabled = true;
            var element = document.getElementById("plyr_heal_name");
            //element.classList.add("button_re_enable");
            //document.getElementById("plyr_heal_name").style.animationDuration = "5s";
            setTimeout(Encounter_Action_heal, 5000);

            Encounter(1);
        } 
    }

    if(modes == 4) {
        //the player slaps enemy...
        enemy.cur_health -= 1;
        document.getElementById("plyr_slap_name").disabled = true;
        var element = document.getElementById("plyr_slap_name");
        //element.classList.add("button_re_enable");
        //document.getElementById("plyr_slap_name").style.animationDuration = "2s";
        setTimeout(Encounter_Action_slap, 2000);

        Encounter(1);

    }

    if(modes == 5) {
        //the player braces shield if they have shield
        if(player.cur_armour >= 1) {

            document.getElementById("plyr_armor_name").disabled = true;
            var element = document.getElementById("plyr_armor_name");
            //element.classList.add("button_re_enable");
            //document.getElementById("plyr_armor_name").style.animationDuration = "4s";
            setTimeout(Encounter_Action_armor, 4000);

            Encounter(1);
        }
    }

}

function Encounter_Action_slap() {

    var element = document.getElementById("plyr_slap_name");
    element.classList.remove("button_re_enable");

    document.getElementById("plyr_slap_name").disabled = false;

}

function Encounter_Action_armor() {

    var element = document.getElementById("plyr_armor_name");
    element.classList.remove("button_re_enable");

    document.getElementById("plyr_armor_name").disabled = false;

}

function Encounter_Action_heal() {

    var element = document.getElementById("plyr_heal_name");
    element.classList.remove("button_re_enable");

    document.getElementById("plyr_heal_name").disabled = false;
    
}

function Encounter_Action_main_attack() {

    var element = document.getElementById("plyr_weapon_name");
    element.classList.remove("button_re_enable");

    document.getElementById("plyr_weapon_name").disabled = false;

}

function Enemy_Attack() {
    //the enemy finally attacks
    if(isinbattle == 1) {
            
        var xx12 = Math.floor((Math.random() * enemy.damange) + 1);
        player.cur_health -= xx12;
        console.log(xx12);
        Encounter(1);
        
    }
}

function endgame(wlconditional){
    document.getElementById("endgame").style.display = "block";
    if(wlconditional == 0) {

    }

    if(wlconditional == 1) {

    }
}

function Boot() {
    $("#eng_logo").fadeOut();
    $("#com_spsh").fadeOut();
    document.getElementById("endgame").style.display = "none";
    document.getElementById("eng_logo").style.display = "none";
    document.getElementById("com_spsh").style.display = "none";
    document.getElementById("scene_tower_config").style.display = "none";
    document.getElementById("scene_level").style.display = "none";
    document.getElementById("scene_encounter").style.display = "none";
    document.getElementById("rpg_window_confirmation").style.display = "none";
    document.getElementById("scene_menu_bars_level").style.display = "none";

    const myTimeout = setTimeout(Boot1, 3000);
}

function Boot1(){
    $("#eng_logo").fadeIn(2000);
    document.getElementById("eng_logo").style.display = "block";
    $("#eng_logo").fadeOut(2000);
    const myTimeout = setTimeout(Boot3, 6000);
}

function Boot3(){
    $("#boot").fadeOut(2000);
    const myTimeout = setTimeout(Boot4, 3000);
}

function Boot4() {
    document.getElementById("boot").style.display = "none";
    UIX(0);
}

function UIX(loadin) {
    if(isdevmode == 0) {
        //document.getElementById("bg").src = bg;
        var w = window.innerWidth;
        var h = window.innerHeight;

        if(w <= 480) {
            ismobile = 1;
        }

        if(loadin == 0) {
            document.getElementById("endgame").style.display = "none";
            document.getElementById("scene_tower_config").style.display = "block";
            document.getElementById("scene_level").style.display = "none";
            document.getElementById("scene_encounter").style.display = "none";
            document.getElementById("rpg_window_confirmation").style.display = "none";
            document.getElementById("scene_menu_bars_level").style.display = "none";
        }

        if(loadin == 1) {
            document.getElementById("scene_tower_config").style.display = "none";
            document.getElementById("scene_level").style.display = "block";
            document.getElementById("scene_encounter").style.display = "none";
            document.getElementById("scene_menu_bars_level").style.display = "block";
        }

        if(loadin == 2) {
            document.getElementById("scene_tower_config").style.display = "none";
            document.getElementById("scene_level").style.display = "none";
            document.getElementById("scene_encounter").style.display = "block";
            document.getElementById("scene_menu_bars_level").style.display = "none";
        }

        if(loadin == 3) {
            document.getElementById("rpg_window_confirmation").style.display = "none";
            document.getElementById("bttn_confirm_ok").style.display = "block";
        }
    }
}


function keydownFunction() {
    //document.getElementById("demo").style.backgroundColor = "red";

    let key = event.key;

    if (key == "w" || key == "W") {
        Game_Command(1);
    }

    if (key == "s" || key == "S") {
        Game_Command(2);
    }

    if (key == "a" || key == "A") {
        Game_Command(4);
    }

    if (key == "d" || key == "D") {
        Game_Command(3);
    }

    if (key == "o" || key == "O") {
        Game_Command(5);
    }

    if (key == "k" || key == "K") {
        Game_Command(6);
    }

}

function keyupFunction() {
    //document.getElementById("demo").style.backgroundColor = "green";
}

/*Notes for project*/

/*
Encounters
- normal difficulty open increases by 0.5 smashing by 1 doubles on hard, halves on easy for parameters...

Tower Size
- smallest is 5 largest is 50 possible

Start Game
- You fall into a hole during your walk into the woods. you wake up at the bottom and find a tower that might lead to the surface. you are given a random weapon to start with...

End Game
- You need the key and get to the top of the tower to defeat the final boss to escape.

Roguelike!
- If you die you lose the game! always will be completely randomized. 
- eventually will need to add 'themed' rooms with specific items but thats well down the line...


for adding music down the line add this to the html body section....

<audio controls autoplay loop src="data:audio/ogg;base64,BASE64CODE" />

"Nothing", "Chest", "Bag"
*/