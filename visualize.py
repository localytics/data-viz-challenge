import folium
import pandas as pd
import ujson as json

with open('data.json') as f:
    all_data = json.load(f)
    df = pd.io.json.json_normalize(all_data['data'])

pd.set_option('display.mpl_style', 'default') 

df['client_time'] = pd.to_datetime(df['client_time'], unit='s')
df['event_name'].value_counts().plot(kind='bar')

funded_df = df[df['event_name'] == 'Fund Project']
filtered_df = funded_df[funded_df['category'].isin(['Sports', 'Environment'])]
filtered_df.groupby('gender')['amount'].aggregate(sum).plot(kind='bar')

state_df = filtered_df.groupby(['location.state', 'marital_status'])['amount'].aggregate({'donations': sum}).reset_index()
state_df['marital_status'].value_counts()

key = 'age'
ungrouped_state_df = filtered_df.groupby('location.state')['amount'].aggregate({'donations': sum}).reset_index()
state_df = filtered_df.groupby(['location.state', key])['amount'].aggregate({'donations': sum}).reset_index()
values = state_df[key].value_counts().keys()

domain = None
for value in values:
    map_osm = folium.Map(location=[48, -102], zoom_start=3)
    df = state_df[state_df[key] == value]

    domain = domain or folium.utilities.split_six(series=df['donations'])
    map_osm.geo_json(geo_path='raw_data/us-states.json', 
                       data_out='raw_data/data_{0}.json'.format(value),
                       data=df,
                       columns=['location.state', 'donations'],
                       key_on='feature.id',
                       threshold_scale=domain,
                       fill_color='YlOrRd', fill_opacity=0.5, line_opacity=0.2,
                       legend_name='{0} Donation totals by state for Sports and Environment'.format(value))
    map_osm.create_map(path='dist/osm_{0}.html'.format(value))
