import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function TurnipPredictor() {
  const [gameVersion, setGameVersion] = useState('tobidase');
  const [buyPrice, setBuyPrice] = useState('');
  const [mondayAM, setMondayAM] = useState('');
  const [prices, setPrices] = useState({
    mondayPM: '', tuesdayAM: '', tuesdayPM: '',
    wednesdayAM: '', wednesdayPM: '', thursdayAM: '', thursdayPM: '',
    fridayAM: '', fridayPM: '', saturdayAM: '', saturdayPM: ''
  });
  const [prediction, setPrediction] = useState(null);

  const updatePrice = (key, value) => {
    setPrices(prev => ({ ...prev, [key]: value }));
  };

  const clearAll = () => {
    setBuyPrice('');
    setMondayAM('');
    setPrices({
      mondayPM: '', tuesdayAM: '', tuesdayPM: '',
      wednesdayAM: '', wednesdayPM: '', thursdayAM: '', thursdayPM: '',
      fridayAM: '', fridayPM: '', saturdayAM: '', saturdayPM: ''
    });
    setPrediction(null);
  };

  useEffect(() => {
    analyzePrices();
  }, [buyPrice, mondayAM, prices, gameVersion]);

  const analyzePrices = () => {
    const buy = parseInt(buyPrice);
    const monAM = parseInt(mondayAM);
    
    if (!buy || !monAM) {
      setPrediction(null);
      return;
    }

    const allPrices = [
      monAM,
      parseInt(prices.mondayPM) || null,
      parseInt(prices.tuesdayAM) || null,
      parseInt(prices.tuesdayPM) || null,
      parseInt(prices.wednesdayAM) || null,
      parseInt(prices.wednesdayPM) || null,
      parseInt(prices.thursdayAM) || null,
      parseInt(prices.thursdayPM) || null,
      parseInt(prices.fridayAM) || null,
      parseInt(prices.fridayPM) || null,
      parseInt(prices.saturdayAM) || null,
      parseInt(prices.saturdayPM) || null
    ];

    const validPrices = allPrices.filter(p => p !== null);
    const rate = monAM / buy;

    let pattern = '';
    let explanation = '';
    let advice = '';
    let icon = null;

    if (gameVersion === 'tobidase') {
      if (rate >= 0.85 && rate <= 0.90) {
        let isDecreasing = true;
        for (let i = 1; i < validPrices.length; i++) {
          if (validPrices[i] > validPrices[i - 1]) {
            isDecreasing = false;
            break;
          }
        }
        
        if (isDecreasing) {
          pattern = 'ジリ貧型';
          explanation = '買値より安い価格が続き、徐々に下がっていくパターンです。';
          advice = '今週は売り時がありません。損切りするか、友達の島で売ることをおすすめします。';
          icon = <TrendingDown className="w-8 h-8 text-red-500" />;
        }
      }

      if (!pattern && rate >= 0.60 && rate <= 0.90) {
        let hasUpAndDown = false;
        let ups = 0, downs = 0;
        
        for (let i = 1; i < validPrices.length; i++) {
          if (validPrices[i] > validPrices[i - 1]) ups++;
          if (validPrices[i] < validPrices[i - 1]) downs++;
        }
        
        if (ups >= 2 && downs >= 2) {
          hasUpAndDown = true;
        }

        if (hasUpAndDown) {
          pattern = '波型';
          explanation = '価格が上下に波打つパターンです。買値の0.9~1.4倍程度の範囲で変動します。';
          advice = '買値より高くなる時があります。1.2倍以上になったら売るのがおすすめです。';
          icon = <Minus className="w-8 h-8 text-yellow-600" />;
        }
      }

      const maxPrice = Math.max(...validPrices);
      const maxRate = maxPrice / buy;
      
      if (!pattern && maxRate >= 1.4) {
        const maxIndex = validPrices.indexOf(maxPrice);
        
        if (maxIndex >= 4 && maxIndex <= 7) {
          pattern = '3期型';
          explanation = '3期目(水曜)あたりから急上昇するパターンです。買値の約1.4~2.0倍まで上がります。';
        } else if (maxIndex >= 7) {
          pattern = '4期型';
          explanation = '4期目(木曜)以降に急上昇するパターンです。買値の約1.4~6.0倍まで上がる可能性があります。';
        } else {
          pattern = '跳ね大型';
          explanation = '価格が大きく跳ね上がるパターンです。';
        }
        
        advice = maxRate >= 2.0 
          ? '非常に高値です!今すぐ売ることを強くおすすめします!' 
          : '高値圏です。ピークの可能性があるので売ることをおすすめします。';
        icon = <TrendingUp className="w-8 h-8 text-green-500" />;
      }

      if (!pattern) {
        if (validPrices.length < 3) {
          pattern = '判定中';
          explanation = 'まだデータが不足しています。価格を入力し続けてください。';
          advice = '火曜日以降のデータを入力すると、より正確な予想ができます。';
          icon = <Minus className="w-8 h-8 text-gray-400" />;
        } else {
          pattern = '3期型 または 4期型の可能性';
          explanation = 'これから価格が急上昇する可能性があります。';
          advice = '価格が急に上がり始めたら、3回連続で上がった後の最高値で売るのがベストです。';
          icon = <TrendingUp className="w-8 h-8 text-blue-500" />;
        }
      }
    } else {
      const maxPrice = Math.max(...validPrices);
      const maxRate = maxPrice / buy;
      
      if (rate >= 0.85 && rate <= 0.90) {
        let isDecreasing = true;
        for (let i = 1; i < validPrices.length; i++) {
          if (validPrices[i] > validPrices[i - 1] * 1.05) {
            isDecreasing = false;
            break;
          }
        }
        
        if (isDecreasing && maxRate < 0.95) {
          pattern = '減少型';
          explanation = '週を通して価格が下がり続けるパターンです。';
          advice = '今週は高値になりません。早めに損切りするか、他の島で売りましょう。';
          icon = <TrendingDown className="w-8 h-8 text-red-500" />;
        }
      }

      if (!pattern && maxRate >= 0.90 && maxRate <= 1.45) {
        let ups = 0, downs = 0;
        for (let i = 1; i < validPrices.length; i++) {
          if (validPrices[i] > validPrices[i - 1]) ups++;
          if (validPrices[i] < validPrices[i - 1]) downs++;
        }
        
        if (ups >= 2 && downs >= 2) {
          pattern = '通常型';
          explanation = '価格が緩やかに上下するパターンです。買値の0.9~1.4倍程度で推移します。';
          advice = '買値の1.2倍以上になったら売るのがおすすめです。大きな儲けは期待できません。';
          icon = <Minus className="w-8 h-8 text-yellow-600" />;
        }
      }

      if (!pattern && maxRate >= 1.4 && maxRate < 2.0) {
        pattern = '跳ね小型';
        explanation = '一度だけ価格が跳ね上がるパターンです。買値の1.4~2.0倍程度まで上昇します。';
        advice = '1.5倍以上の時が売り時です。ピークを見極めて売りましょう。';
        icon = <TrendingUp className="w-8 h-8 text-blue-500" />;
      }

      if (!pattern && maxRate >= 2.0) {
        pattern = '跳ね大型';
        explanation = '価格が大きく跳ね上がるパターンです。買値の2.0~6.0倍まで上昇する可能性があります！';
        advice = maxRate >= 3.0 
          ? '超高値です！今すぐ売ることを強くおすすめします！' 
          : '高値です！2倍以上なら売り時です。さらに上がる可能性もあります。';
        icon = <TrendingUp className="w-8 h-8 text-green-500" />;
      }

      if (!pattern) {
        if (validPrices.length < 3) {
          pattern = '判定中';
          explanation = 'まだデータが不足しています。価格を入力し続けてください。';
          advice = '火曜日以降のデータを入力すると、より正確な予想ができます。';
          icon = <Minus className="w-8 h-8 text-gray-400" />;
        } else {
          pattern = '跳ね型の可能性';
          explanation = 'これから価格が急上昇する可能性があります。';
          advice = '価格が上昇し始めたら、ピークを見極めて売りましょう。';
          icon = <TrendingUp className="w-8 h-8 text-blue-500" />;
        }
      }
    }

    setPrediction({
      pattern,
      explanation,
      advice,
      icon,
      maxRate: (Math.max(...validPrices) / buy).toFixed(2),
      currentRate: rate.toFixed(2)
    });
  };

  const days = [
    { label: '月曜', am: 'mondayAM', pm: 'mondayPM' },
    { label: '火曜', am: 'tuesdayAM', pm: 'tuesdayPM' },
    { label: '水曜', am: 'wednesdayAM', pm: 'wednesdayPM' },
    { label: '木曜', am: 'thursdayAM', pm: 'thursdayPM' },
    { label: '金曜', am: 'fridayAM', pm: 'fridayPM' },
    { label: '土曜', am: 'saturdayAM', pm: 'saturdayPM' }
  ];

  const gameInfo = {
    tobidase: {
      title: 'とびだせどうぶつの森',
      patterns: [
        { name: '波型', desc: '価格が波のように上下する。買値の0.9~1.4倍程度' },
        { name: 'ジリ貧型', desc: '価格が継続的に下がり続ける。買値より安い' },
        { name: '3期型', desc: '水曜あたりから急上昇。買値の1.4~2倍程度' },
        { name: '4期型', desc: '木曜以降に急上昇。買値の1.4~6倍も!' }
      ]
    },
    atsumori: {
      title: 'あつまれどうぶつの森',
      patterns: [
        { name: '通常型', desc: '価格が緩やかに上下。買値の0.9~1.4倍程度' },
        { name: '減少型', desc: '価格が週を通して下がり続ける' },
        { name: '跳ね小型', desc: '一度だけ跳ね上がる。買値の1.4~2倍程度' },
        { name: '跳ね大型', desc: '大きく跳ね上がる。買値の2~6倍も!' }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2 text-center">
            🥬 カブ価格予想ツール
          </h1>
          
          <div className="mb-6 flex justify-center">
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200 w-full max-w-md">
              <label className="block text-sm font-semibold text-green-900 mb-2 text-center">
                🎮 ゲームバージョン
              </label>
              <select
                value={gameVersion}
                onChange={(e) => setGameVersion(e.target.value)}
                className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 text-center font-semibold"
              >
                <option value="tobidase">とびだせどうぶつの森 (3DS)</option>
                <option value="atsumori">あつまれどうぶつの森 (Switch)</option>
              </select>
            </div>
          </div>

          <p className="text-gray-600 text-center mb-6">{gameInfo[gameVersion].title}</p>

          <div className="flex justify-end mb-4">
            <button
              onClick={clearAll}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 shadow-md"
            >
              🗑️ すべてクリア
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
              <label className="block text-sm font-semibold text-yellow-900 mb-2">
                📝 日曜日の買値
              </label>
              <input
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder="例: 100"
                className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                📊 月曜午前の売値
              </label>
              <input
                type="number"
                value={mondayAM}
                onChange={(e) => setMondayAM(e.target.value)}
                placeholder="例: 85"
                className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {prediction && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 mb-6">
              <div className="flex items-center gap-3 mb-3">
                {prediction.icon}
                <h2 className="text-2xl font-bold text-purple-900">
                  パターン予想: {prediction.pattern}
                </h2>
              </div>
              <p className="text-gray-700 mb-2">{prediction.explanation}</p>
              <p className="text-lg font-semibold text-purple-800 mb-3">
                💡 {prediction.advice}
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-600">
                  月曜午前倍率: <span className="font-bold">{prediction.currentRate}倍</span>
                </span>
                <span className="text-gray-600">
                  最高倍率: <span className="font-bold">{prediction.maxRate}倍</span>
                </span>
              </div>
            </div>
          )}

          <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📅 週間売値記録</h3>
            <div className="space-y-3">
              {days.map((day, index) => (
                <div key={index} className="grid grid-cols-3 gap-3 items-center">
                  <div className="font-semibold text-gray-700">{day.label}</div>
                  <div>
                    <input
                      type="number"
                      value={day.label === '月曜' ? mondayAM : prices[day.am]}
                      onChange={(e) => {
                        if (day.label === '月曜') {
                          setMondayAM(e.target.value);
                        } else {
                          updatePrice(day.am, e.target.value);
                        }
                      }}
                      placeholder="午前"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={prices[day.pm]}
                      onChange={(e) => updatePrice(day.pm, e.target.value)}
                      placeholder="午後"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-900 mb-2">📚 {gameInfo[gameVersion].title}の4つのパターン</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              {gameInfo[gameVersion].patterns.map((p, i) => (
                <li key={i}><strong>{p.name}:</strong> {p.desc}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}