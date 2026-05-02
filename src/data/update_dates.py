from datetime import date, timedelta

with open("songs.const.js", "r") as f:
    content = f.read()

old_start = date(2026, 5, 2)
new_start = date(2026, 5, 2) # <- change this each time

for i in range(24):
    old = (old_start + timedelta(days=i)).isoformat()
    new = (new_start + timedelta(days=i)).isoformat()
    content = content.replace(f'date: "{old}"', f'date: "{new}"')

with open("songs.const.js", "w") as f:
    f.write(content)

print("Done!")