import http.client
from concurrent.futures import ThreadPoolExecutor, as_completed

def close_chat(conv_id): 
    conn = http.client.HTTPSConnection("karmalife-589380110616359290-82de616b7348f7316868365.freshchat.com")
    payload = "{\n      \"status\": \"resolved\",\n      \"assigned_agent_id\":\"dd3424fb-d967-4df6-84ec-d87f092257b8\"\n}"
    headers = {
        'accept': 'application/json',
        'content-type': 'application/JSON',
        'Authorization': 'Bearer eyJraWQiOiJjdXN0b20tb2F1dGgta2V5aWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmcmVzaGNoYXQiLCJzdWIiOiJhNzVhMmVjMi03MDViLTQyNDItYWQ5Ny00Y2MzMGZmYmJkZGUiLCJjbGllbnRJZCI6ImZjLTc4NTRkMjk5LTZhNjgtNGJhOS1hN2RhLTQzOGVhOGYyZmE0ZiIsInNjb3BlIjoiYWdlbnQ6cmVhZCBhZ2VudDpjcmVhdGUgYWdlbnQ6dXBkYXRlIGFnZW50OmRlbGV0ZSBjb252ZXJzYXRpb246Y3JlYXRlIGNvbnZlcnNhdGlvbjpyZWFkIGNvbnZlcnNhdGlvbjp1cGRhdGUgbWVzc2FnZTpjcmVhdGUgbWVzc2FnZTpnZXQgYmlsbGluZzp1cGRhdGUgcmVwb3J0czpmZXRjaCByZXBvcnRzOmV4dHJhY3QgcmVwb3J0czpyZWFkIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIGFjY291bnQ6cmVhZCBkYXNoYm9hcmQ6cmVhZCB1c2VyOnJlYWQgdXNlcjpjcmVhdGUgdXNlcjp1cGRhdGUgdXNlcjpkZWxldGUgb3V0Ym91bmRtZXNzYWdlOnNlbmQgb3V0Ym91bmRtZXNzYWdlOmdldCBtZXNzYWdpbmctY2hhbm5lbHM6bWVzc2FnZTpzZW5kIG1lc3NhZ2luZy1jaGFubmVsczptZXNzYWdlOmdldCBtZXNzYWdpbmctY2hhbm5lbHM6dGVtcGxhdGU6Y3JlYXRlIG1lc3NhZ2luZy1jaGFubmVsczp0ZW1wbGF0ZTpnZXQgZmlsdGVyaW5ib3g6cmVhZCBmaWx0ZXJpbmJveDpjb3VudDpyZWFkIHJvbGU6cmVhZCBpbWFnZTp1cGxvYWQiLCJpc3MiOiJmcmVzaGNoYXQiLCJ0eXAiOiJCZWFyZXIiLCJleHAiOjIwMDY0MjIzMTgsImlhdCI6MTY5MDgwMzExOCwianRpIjoiNmJhNmQ5OGEtNTc1OS00OTNiLWI2M2UtYzFhMjVhMjhlMGE3In0.KCchUgTraiWEGI_vhupaso3yWfSe1aKJdISMZRpI47k'
    }
    endpoint = f'/v2/conversations/{conv_id}'
    try:
        conn.request("PUT", endpoint, payload, headers)
        res = conn.getresponse()
        data = res.status
        print(f"Closed chat for conversation ID: {conv_id}")
        print(data)
    except Exception as e:
        print(f"An error occurred for conversation ID {conv_id}: {e}")
    finally:
        conn.close()

def process_conversations(file_path, num_lines=None):
    with open(file_path, 'r') as file:
        conv_ids = file.readlines()

    if num_lines is not None:
        conv_ids = conv_ids[:num_lines]
    print(f'Number of conversation IDs: {len(conv_ids)}')
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(close_chat, conv_id.strip()): conv_id for conv_id in conv_ids}
        for future in as_completed(futures):
            try:
                future.result()
            except Exception as e:
                print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Test with the first 5 lines
    process_conversations('conv_ids.txt')