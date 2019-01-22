import json
import time
import dota2api

ABILITIES = json.load(open(dota2api.__file__[:-11] + 'ref/abilities.json'))

def get_ad_matches(from_event_id):
    ad_matches = []
    with open('./config/steam_key_config.json', 'r') as config_file:
        config = json.load(config_file)
    client = dota2api.Initialise(config['steam']['steamApiKey'])
    test = client.get_match_history(min_players=10)
    for match_id in [t['match_id'] for t in test['matches']]:
        match = client.get_match_details(match_id=match_id)
        if match['game_mode'] == 18:
            ad_matches.append(match)
        time.sleep(1)
    return ad_matches

def get_ability_name(ability_id):
    ## Account for wisp_spirits_out and return the ability name for a given id
    matches = [
        ability for ability in ABILITIES['abilities']
        if (int(ability['id']) if ability['id'].isdigit() else ability['id']) == ability_id
    ][0]
    return matches if matches else ''

def parse_match(ad_match):
    return {
        'matchID': {'N': ad_match['match_id']},
        'match_seq_num': {'N': ad_match['match_seq_num']},
        'abandon': {'BOOL': any([player['leaver_status'] != 0 for player in ad_match['players']])},
        'server': {'S': ad_match['cluster_name']},
        'dire_kills': {'N': ad_match['dire_score']},
        'radiant_kills': {'N': ad_match['radiant_score']},
        'winner': {'S': 'radiant' if ad_match['radiant_win'] else 'dire'},
        'start_time': {'N': ad_match['start_time']},
        'duration': {'N': ad_match['duration']},
        'first_blood_time': {'N': ad_match['first_blood_time']},
        'players': {'L': [{
            'M': {
                'team': {'S': 'dire' if player['player_slot'] > 128 else 'radiant'},
                'number': {
                    'N': player['player_slot']
                    if player['player_slot'] < 128
                    else player['player_slot'] - 128
                },
                'hero': player['hero_name'],
                'abilities': {'L': [
                    {"S": get_ability_name(ability_id)}
                    for ability_id in set(
                        ability['ability']
                        for ability in player['ability_upgrades']
                    )
                ]},
                'level': {"N": player['level']},
                'ability_levels': {"L": [
                    {"M": {
                        "ability": {"S": get_ability_name(ability_level['ability'])},
                        "level": {"N": ability_level['level']},
                        "time": {"N": ability_level['time']},
                    }} for ability_level in player['ability_upgrades']
                ]},
                'items': {
                    "M": {
                        "slot_1" : {"S": player['item_0_name'] if 'item_0_name' in player else ''},
                        "slot_2" : {"S": player['item_1_name'] if 'item_1_name' in player else ''},
                        "slot_3" : {"S": player['item_2_name'] if 'item_2_name' in player else ''},
                        "slot_4" : {"S": player['item_3_name'] if 'item_3_name' in player else ''},
                        "slot_5" : {"S": player['item_4_name'] if 'item_4_name' in player else ''},
                        "slot_6" : {"S": player['item_5_name'] if 'item_5_name' in player else ''},
                        "backpack_1" : {"S": player['backpack_0'] if 'item_0_name' in player else ''},
                        "backpack_2" : {"S": player['backpack_1'] if 'item_1_name' in player else ''},
                        "backpack_3" : {"S": player['backpack_2'] if 'item_2_name' in player else ''},
                    }
                },
                'kills': {"N": player['kills']},
                'deaths': {"N": player['deaths']},
                'assists': {"N": player['assists']},
                'damage_dealt': {"N": player['hero_damage']},
                'healing_given': {"N": player['hero_healing']},
                'scaled_damage_dealt': {"N": player['scaled_hero_damage']},
                'scaled_healing_given': {"N": player['scaled_hero_damage']},
                'last_hits': {"N": player['last_hits']},
                'denies': {"N": player['denies']},
                'gpm': {"N": player['gold_per_min']},
                'xpm': {"N": player['xp_per_min']},
                'gold_spent': {"N": player['gold_spent']},
                'leaver_status': {"S": player['leaver_status_name']},
            }
        } for player in ad_match['players']]}
    }


def hello(event, context):
    ad_matches = get_ad_matches(from_event_id=event['from_event_id'])
    json.dump(ad_matches, open('raw.json', 'w'))
    parsed_matches = []
    for match in ad_matches:
        try:
            parsed_matches.append(parse_match(match))
        except Exception as err:
            print(match)
            raise err
    json.dump(parsed_matches, open('parsed.json', 'w'))
    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

    # Use this code if you don't use the http event with the LAMBDA-PROXY
    # integration
    """
    return {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "event": event
    }
    """

if __name__ == "__main__":
    print(hello({'from_event_id': 0}, {}))
