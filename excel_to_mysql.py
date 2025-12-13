import pandas as pd
import mysql.connector
import numpy as np

# -----------------------------
# ① MySQL 접속 설정
# -----------------------------
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root1234",
    database="emergency_toilet",
    charset="utf8",
)

cursor = db.cursor()

# -----------------------------
# ② INSERT SQL (필요한 컬럼만)
# -----------------------------
sql = """
INSERT INTO toilet (name, road_address, lot_address, latitude, longitude, open_time)
VALUES (%s, %s, %s, %s, %s, %s)
"""

# -----------------------------
# ③ 엑셀 파일 리스트
# -----------------------------
files = ["seoul.xlsx", "kungki.xlsx"]

# -----------------------------
# ④ 각 엑셀 파일 처리
# -----------------------------
for file in files:
    print(f"📌 Loading Excel: {file}")
    df = pd.read_excel(file)

    # 결측치는 None으로 변환
    df = df.replace({np.nan: None})

    for idx, row in df.iterrows():

        # WGS84 위도/경도 없으면 Skip
        if row["WGS84위도"] is None or row["WGS84경도"] is None:
            continue

        data = (
            row["화장실명"],  # name
            row["소재지도로명주소"],  # road_address
            row["소재지지번주소"],  # lot_address
            row["WGS84위도"],  # latitude
            row["WGS84경도"],  # longitude
            row["개방시간"],  # open_time
        )

        cursor.execute(sql, data)

    db.commit()
    print(f"✅ Insert completed for: {file}")

# -----------------------------
# ⑤ 마무리
# -----------------------------
cursor.close()
db.close()

print("🎉 All Excel files imported successfully!")
