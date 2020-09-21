# Raspberrypi-Meteorological-Instruments
## 概要
Raspberry piを使った、温度・湿度・気圧を測り、グラフ化します。
## 使い方
```bash
python ~/denpa-gardening/get_sensor_data.py >> ~/denpa-gardening/sensor_data/sensor_data.csv
```
これをcrontabを使って、任意の間隔で実行できるようにする。

その後、index.htmlがあるディレクトリで
```bash
python3 -m http.server 8000
```
を実行する。
データをある程度取得したころに、http://[ラズパイのipアドレス]:8000 にアクセスすると、グラフが描画される（はず）。
