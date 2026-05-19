#!/bin/bash
cd "$(dirname "$0")/frontend/images"
rm -f *.jpg *.png

download() {
  local file="$1"
  local url="$2"
  curl -sL --retry 2 -o "$file" "$url"
  local size=$(stat -c%s "$file" 2>/dev/null || echo 0)
  if [ "$size" -gt 10000 ]; then
    echo "✓ $file (${size}o)"
  else
    echo "✗ $file ECHEC"
  fi
}

# === SPORT ===
download "yzf-r1-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/5/50/Yamaha_YZF-R1_at_the_Tokyo_Motor_Show_2009-1_neutral_background.jpg"
download "yzf-r1-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/5/50/Yamaha_YZF-R1_at_the_Tokyo_Motor_Show_2009-1_neutral_background.jpg"
download "yzf-r1-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/5/50/Yamaha_YZF-R1_at_the_Tokyo_Motor_Show_2009-1_neutral_background.jpg"
download "yzf-r6-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/8/8e/Yamaha_R6_K265_%282017-03-31_ht%29.jpg"
download "yzf-r6-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/8/8e/Yamaha_R6_K265_%282017-03-31_ht%29.jpg"
download "yzf-r6-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/8/8e/Yamaha_R6_K265_%282017-03-31_ht%29.jpg"
download "yzf-r3-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/d2/2015_Yamaha_YZF-R3_right.JPG"
download "yzf-r3-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/d2/2015_Yamaha_YZF-R3_right.JPG"
download "yzf-r3-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/d2/2015_Yamaha_YZF-R3_right.JPG"
download "yzf-r125-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/9/90/Yamaha_YZF-R125_2025.jpg"
download "yzf-r125-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/a/aa/Yamaha_YZF-R125_blu.jpg"
download "yzf-r125-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/9/90/Yamaha_YZF-R125_2025.jpg"

# === NAKED MT ===
download "mt-10-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/c/c1/2022_Yamaha_MT-10.jpg"
download "mt-10-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/c/c1/2022_Yamaha_MT-10.jpg"
download "mt-10-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/c/c1/2022_Yamaha_MT-10.jpg"
download "mt-09-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/f/f8/2022_Yamaha_MT-09.jpg"
download "mt-09-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/6/6a/Yamaha_MT-09_2014.jpg"
download "mt-09-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/f/f8/2022_Yamaha_MT-09.jpg"
download "mt-09-sp-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/f/f8/2022_Yamaha_MT-09.jpg"
download "mt-09-sp-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/6/6a/Yamaha_MT-09_2014.jpg"
download "mt-09-sp-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/f/f8/2022_Yamaha_MT-09.jpg"
download "mt-07-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/9/9c/2021_Black_Yamaha_MT-07.jpg"
download "mt-07-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/9/9c/2021_Black_Yamaha_MT-07.jpg"
download "mt-07-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/9/9c/2021_Black_Yamaha_MT-07.jpg"
download "mt-03-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/7/7d/Moscow%2C_Yamaha_MT-03%2C_June_2025_01.jpg"
download "mt-03-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/7/7d/Moscow%2C_Yamaha_MT-03%2C_June_2025_01.jpg"
download "mt-03-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/7/7d/Moscow%2C_Yamaha_MT-03%2C_June_2025_01.jpg"
download "mt-125-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/7/7d/Moscow%2C_Yamaha_MT-03%2C_June_2025_01.jpg"
download "mt-125-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/7/7d/Moscow%2C_Yamaha_MT-03%2C_June_2025_01.jpg"
download "mt-125-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/7/7d/Moscow%2C_Yamaha_MT-03%2C_June_2025_01.jpg"

# === ADVENTURE ===
download "tenere-700-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/8/88/Yamaha_Tenere_700.jpg"
download "tenere-700-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/9/95/06-2024_Yamaha_Rally_Tenere_700.jpg"
download "tenere-700-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/8/88/Yamaha_Tenere_700.jpg"
download "tenere-700-wr-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/9/95/06-2024_Yamaha_Rally_Tenere_700.jpg"
download "tenere-700-wr-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/8/88/Yamaha_Tenere_700.jpg"
download "tenere-700-wr-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/9/95/06-2024_Yamaha_Rally_Tenere_700.jpg"
download "super-tenere-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/c/c5/Yamaha_Super_Tenere_1200_Z_2013_%2815578373544%29.jpg"
download "super-tenere-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/4/43/Yamaha_XT_1200_Z_Super_T%C3%A9n%C3%A9r%C3%A9.jpg"
download "super-tenere-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/c/c5/Yamaha_Super_Tenere_1200_Z_2013_%2815578373544%29.jpg"

# === RETRO XSR ===
download "xsr-900-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/f/f8/2022_Yamaha_XSR900.png"
download "xsr-900-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/f/f8/2022_Yamaha_XSR900.png"
download "xsr-900-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/f/f8/2022_Yamaha_XSR900.png"
download "xsr-700-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/1/10/2022_Yamaha_XSR700.jpg"
download "xsr-700-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/1/10/2022_Yamaha_XSR700.jpg"
download "xsr-700-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/1/10/2022_Yamaha_XSR700.jpg"
download "xsr-125-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/db/Yamaha_XSR_125_2026.jpg"
download "xsr-125-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/db/Yamaha_XSR_125_2026.jpg"
download "xsr-125-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/db/Yamaha_XSR_125_2026.jpg"

# === MOTOCROSS ===
download "yz-450f-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/da/YAMAHA_YZ450F_2010-1_Yamaha_Communication_Plaza.jpg"
download "yz-450f-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/da/YAMAHA_YZ450F_2010-1_Yamaha_Communication_Plaza.jpg"
download "yz-450f-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/da/YAMAHA_YZ450F_2010-1_Yamaha_Communication_Plaza.jpg"
download "yz-250f-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/da/YAMAHA_YZ450F_2010-1_Yamaha_Communication_Plaza.jpg"
download "yz-250f-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/da/YAMAHA_YZ450F_2010-1_Yamaha_Communication_Plaza.jpg"
download "yz-250f-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/da/YAMAHA_YZ450F_2010-1_Yamaha_Communication_Plaza.jpg"
download "yz-125-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/7/7f/Yamaha_YZ125_Motorcycle.jpg"
download "yz-125-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/7/7f/Yamaha_YZ125_Motorcycle.jpg"
download "yz-125-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/7/7f/Yamaha_YZ125_Motorcycle.jpg"

# === ENDURO ===
download "wr-450f-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/6/6d/2010_Yamaha_WR450F_at_2009_Seattle_International_Motorcycle_Show_2.jpg"
download "wr-450f-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/6/6d/2010_Yamaha_WR450F_at_2009_Seattle_International_Motorcycle_Show_2.jpg"
download "wr-450f-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/6/6d/2010_Yamaha_WR450F_at_2009_Seattle_International_Motorcycle_Show_2.jpg"
download "wr-250f-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/6/6d/2010_Yamaha_WR450F_at_2009_Seattle_International_Motorcycle_Show_2.jpg"
download "wr-250f-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/6/6d/2010_Yamaha_WR450F_at_2009_Seattle_International_Motorcycle_Show_2.jpg"
download "wr-250f-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/6/6d/2010_Yamaha_WR450F_at_2009_Seattle_International_Motorcycle_Show_2.jpg"

# === CUSTOM ===
download "xv950-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/1/1d/Yamaha_XV950.jpg"
download "xv950-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/1/1d/Yamaha_XV950.jpg"
download "xv950-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/1/1d/Yamaha_XV950.jpg"
download "vmax-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/9/9b/Yamaha_Vmax_motorbike.jpg"
download "vmax-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/9/9b/Yamaha_Vmax_motorbike.jpg"
download "vmax-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/9/9b/Yamaha_Vmax_motorbike.jpg"

# === SPORT TOURING ===
download "niken-gt-1.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/d7/Yamaha_Niken_-_Mondial_de_l%27Automobile_de_Paris_2018_-_003.jpg"
download "niken-gt-2.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/d7/Yamaha_Niken_-_Mondial_de_l%27Automobile_de_Paris_2018_-_003.jpg"
download "niken-gt-3.jpg" "https://upload.wikimedia.org/wikipedia/commons/d/d7/Yamaha_Niken_-_Mondial_de_l%27Automobile_de_Paris_2018_-_003.jpg"

echo ""
echo "=== TERMINÉ: $(ls *.jpg 2>/dev/null | wc -l) images ==="
