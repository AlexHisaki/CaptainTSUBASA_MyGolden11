/**
 * ゲームコンボデータベース - JavaScript アプリケーションロジック (キャプテン翼サッカーテーマ)
 */

// ローカルファイル / ネットワークエラー時等の超安全組み込みデフォルトデータ
const DEFAULT_COMBO_DATA = {
  "combo_001": { "combo_name": "南葛黄金コンビ", "": ["大空翼", "岬太郎"], "notes": null },
  "combo_002": { "combo_name": "ジャンピングツインシュート", "": ["大空翼", "岬太郎"], "notes": "赤カード限定" },
  "combo_003": { "combo_name": "最後の試合相手", "": ["大空翼", "三杉淳"], "notes": null },
  "combo_004": { "combo_name": "ちょうせん状", "": ["大空翼", "若林源三"], "notes": null },
  "combo_005": { "combo_name": "日本のダブルエース", "": ["大空翼", "日向小次郎"], "notes": null },
  "combo_006": { "combo_name": "ジャンピングヘッド", "": ["大空翼", "高杉真吾"], "notes": null },
  "combo_007": { "combo_name": "キャプテン同士の激突", "": ["大空翼", "カール・ハインツ・シュナイダー"], "notes": null },
  "combo_008": { "combo_name": "いくぞピエール", "": ["大空翼", "エル・シド・ピエール"], "notes": null },
  "combo_009": { "combo_name": "いっしょにがんばった仲間", "": ["岬太郎", "松山光"], "notes": null },
  "combo_010": { "combo_name": "貴公子とアーティストの共鳴", "": ["岬太郎", "三杉淳"], "notes": null },
  "combo_011": { "combo_name": "一対一の勝負", "": ["岬太郎", "エル・シド・ピエール"], "notes": null },
  "combo_012": { "combo_name": "日本の秘密兵器", "": ["三杉淳", "ファン・ディアス"], "notes": null },
  "combo_013": { "combo_name": "キャプテン同士の奪い合い", "": ["松山光", "日向小次郎"], "notes": null },
  "combo_014": { "combo_name": "よそ見なんかしてるんじゃねぇ", "": ["日向小次郎", "カール・ハインツ・シュナイダー"], "notes": null },
  "combo_015": { "combo_name": "圧倒的なハングリー精神", "": ["日向小次郎", "ファン・ディアス"], "notes": null },
  "combo_016": { "combo_name": "天才vs猛虎", "": ["日向小次郎", "若林源三"], "notes": "日向赤カード限定" },
  "combo_017": { "combo_name": "いくぜキャプテン", "": ["日向小次郎", "若島津健"], "notes": null },
  "combo_018": { "combo_name": "東邦フォワードコンビ", "": ["日向小次郎", "反町一樹"], "notes": null },
  "combo_019": { "combo_name": "若き皇帝とSGGK", "": ["若林源三", "カール・ハインツ・シュナイダー"], "notes": null },
  "combo_020": { "combo_name": "縄張り争い", "": ["若林源三", "石崎了"], "notes": null },
  "combo_021": { "combo_name": "日本の正GKの座", "": ["若林源三", "若島津健"], "notes": null },
  "combo_022": { "combo_name": "若林さんの教え", "": ["若林源三", "森崎有三"], "notes": null },
  "combo_023": { "combo_name": "スカイラブ・ハリケーン", "": ["立花政夫", "立花和夫"], "notes": null },
  "combo_024": { "combo_name": "空中サッカーやぶり", "": ["立花和夫", "石崎了"], "notes": null },
  "combo_025": { "combo_name": "約束の応援団", "": ["石崎了", "浦辺反次"], "notes": null },
  "combo_026": { "combo_name": "南葛必死のダブルタックル", "": ["石崎了", "岸田猛"], "notes": null },
  "combo_027": { "combo_name": "決勝進出をかけたPK戦", "": ["若島津健", "エル・シド・ピエール"], "notes": null },
  "combo_028": { "combo_name": "打倒南葛", "": ["浦辺反次", "岸田猛"], "notes": null },
  "combo_029": { "combo_name": "ちびっこコンビ", "": ["沢田タケシ", "佐野満"], "notes": null },
  "combo_030": { "combo_name": "東邦のみごとな連係プレイ", "": ["沢田タケシ", "反町一樹"], "notes": null },
  "combo_031": { "combo_name": "南葛シルバーコンビ", "": ["来生哲兵", "滝一"], "notes": null },
  "combo_032": { "combo_name": "修哲トリオ", "": ["井沢守", "来生哲兵", "滝一"], "notes": null },
  "combo_033": { "combo_name": "南葛黄金コンビvsディアス", "": ["大空翼", "岬太郎", "ファン・ディアス"], "notes": null },
  "combo_034": { "combo_name": "立花兄弟のマッサージ", "": ["立花政夫", "立花和夫", "佐野満"], "notes": null },
  "combo_035": { "combo_name": "立花兄弟のかわり", "": ["反町一樹", "立花政夫", "立花和夫", "佐野満"], "notes": null },
  "combo_036": { "combo_name": "修哲からずっと一緒", "": ["井沢守", "来生哲兵", "滝一", "高杉真吾", "森崎有三"], "notes": null }
};

function initApp() {
  let allCombos = [];
  let currentFilteredCombos = [];
  let selectedCharacterFilter = null;
  let currentSearchQuery = '';

  const searchInput = document.getElementById('search-input');
  const btnClearSearch = document.getElementById('btn-clear-search');
  const comboGrid = document.getElementById('combo-grid');
  const loadingSpinner = document.getElementById('loading-spinner');
  const errorMessage = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');
  const noResults = document.getElementById('no-results');
  const resultCount = document.getElementById('result-count');
  const totalCount = document.getElementById('total-count');
  
  const activeFilterContainer = document.getElementById('active-filter-container');
  const activeFilterName = document.getElementById('active-filter-name');
  const btnRemoveCharFilter = document.getElementById('btn-remove-char-filter');
  const btnResetAll = document.getElementById('btn-reset-all');
  const btnNoResultReset = document.getElementById('btn-no-result-reset');
  
  const characterTagsBar = document.getElementById('character-tags-bar');

  function normalizeText(str) {
    if (!str) return '';
    try {
      return str
        .normalize('NFKC')
        .toLowerCase()
        .replace(/[\u30a1-\u30f6]/g, match => String.fromCharCode(match.charCodeAt(0) - 0x60))
        .trim();
    } catch (e) {
      return String(str).toLowerCase().trim();
    }
  }

  function normalizeComboData(rawData) {
    if (!rawData) return [];
    let result = [];
    try {
      if (Array.isArray(rawData)) {
        result = rawData.map((item, idx) => ({
          id: item.id || `combo_${String(idx + 1).padStart(3, '0')}`,
          combo_name: item.combo_name || item.name || '名称未設定コンボ',
          characters: Array.isArray(item.characters) ? item.characters : (Array.isArray(item[""]) ? item[""] : []),
          notes: item.notes || null
        }));
      } else if (typeof rawData === 'object') {
        result = Object.entries(rawData).map(([key, item], idx) => ({
          id: item.id || key || `combo_${String(idx + 1).padStart(3, '0')}`,
          combo_name: item.combo_name || item.name || '名称未設定コンボ',
          characters: Array.isArray(item.characters) ? item.characters : (Array.isArray(item[""]) ? item[""] : []),
          notes: item.notes || null
        }));
      }
    } catch (e) {
      console.error('Data normalize error:', e);
    }
    return result;
  }

  function hideLoading() {
    if (loadingSpinner) {
      loadingSpinner.classList.add('hidden');
      loadingSpinner.style.display = 'none'; // インラインスタイルでも確実に非表示
    }
  }

  function showLoading() {
    if (loadingSpinner) {
      loadingSpinner.classList.remove('hidden');
      loadingSpinner.style.display = 'block';
    }
    if (comboGrid) comboGrid.innerHTML = '';
    if (noResults) noResults.classList.add('hidden');
  }

  function initDatabase() {
    hideLoading();
    if (totalCount) totalCount.textContent = allCombos.length;
    renderCharacterQuickTags();
    applyFilterAndSearch();
  }

  async function fetchComboData() {
    showLoading();
    let dataLoaded = false;
    try {
      const response = await fetch('data.json');
      if (response.ok) {
        const data = await response.json();
        allCombos = normalizeComboData(data);
        if (allCombos.length > 0) dataLoaded = true;
      }
    } catch (err) {
      console.info('data.json fetch fallback:', err);
    }

    if (!dataLoaded) {
      allCombos = normalizeComboData(DEFAULT_COMBO_DATA);
    }
    
    initDatabase();
  }

  function applyFilterAndSearch() {
    const normQuery = normalizeText(currentSearchQuery);

    currentFilteredCombos = allCombos.filter(combo => {
      if (selectedCharacterFilter) {
        if (!combo.characters.includes(selectedCharacterFilter)) return false;
      }

      if (!normQuery) return true;

      if (normalizeText(combo.combo_name).includes(normQuery)) return true;
      if (combo.characters.some(c => normalizeText(c).includes(normQuery))) return true;
      if (combo.notes && normalizeText(combo.notes).includes(normQuery)) return true;

      return false;
    });

    updateUIState();
    renderComboCards(currentFilteredCombos);
  }

  function updateUIState() {
    if (resultCount) resultCount.textContent = currentFilteredCombos.length;

    if (currentSearchQuery.length > 0) {
      btnClearSearch?.classList.remove('hidden');
    } else {
      btnClearSearch?.classList.add('hidden');
    }

    if (selectedCharacterFilter) {
      if (activeFilterContainer) {
        activeFilterContainer.classList.remove('hidden');
        activeFilterContainer.classList.add('flex');
        activeFilterContainer.style.display = 'flex';
      }
      if (activeFilterName) activeFilterName.textContent = selectedCharacterFilter;
    } else {
      if (activeFilterContainer) {
        activeFilterContainer.classList.add('hidden');
        activeFilterContainer.classList.remove('flex');
        activeFilterContainer.style.display = 'none';
      }
    }

    document.querySelectorAll('.char-quick-tag').forEach(tag => {
      const charName = tag.dataset.char;
      if (charName === selectedCharacterFilter) {
        tag.className = 'char-quick-tag cursor-pointer px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500 text-black border border-amber-300 font-tech shadow-md shadow-amber-500/20 transition-all';
      } else {
        tag.className = 'char-quick-tag cursor-pointer px-2.5 py-1 rounded-lg text-xs font-medium bg-pitch-card hover:bg-emerald-900/60 text-emerald-100 hover:text-amber-300 border border-pitch-border hover:border-emerald-500/40 font-tech transition-all';
      }
    });
  }

  function renderCharacterQuickTags() {
    if (!characterTagsBar) return;
    characterTagsBar.innerHTML = '';
    
    const charCountMap = {};
    allCombos.forEach(combo => {
      combo.characters.forEach(char => {
        charCountMap[char] = (charCountMap[char] || 0) + 1;
      });
    });

    const sortedChars = Object.keys(charCountMap).sort((a, b) => charCountMap[b] - charCountMap[a]);

    if (sortedChars.length === 0) {
      characterTagsBar.innerHTML = '<span class="text-xs text-emerald-600">選手データがありません</span>';
      return;
    }

    const fragment = document.createDocumentFragment();

    const allTag = document.createElement('button');
    allTag.textContent = '全選手表示';
    allTag.className = 'char-quick-tag cursor-pointer px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500 text-black border border-amber-300 font-tech shadow-md shadow-amber-500/20 transition-all';
    allTag.addEventListener('click', () => {
      selectedCharacterFilter = null;
      applyFilterAndSearch();
    });
    fragment.appendChild(allTag);

    sortedChars.forEach(char => {
      const tag = document.createElement('button');
      tag.dataset.char = char;
      tag.className = 'char-quick-tag cursor-pointer px-2.5 py-1 rounded-lg text-xs font-medium bg-pitch-card hover:bg-emerald-900/60 text-emerald-100 hover:text-amber-300 border border-pitch-border hover:border-emerald-500/40 font-tech transition-all flex items-center gap-1';
      tag.innerHTML = `<span>${escapeHtml(char)}</span><span class="text-[10px] text-amber-400/80 font-bold">(${charCountMap[char]})</span>`;
      
      tag.addEventListener('click', () => {
        selectedCharacterFilter = (selectedCharacterFilter === char) ? null : char;
        applyFilterAndSearch();
      });

      fragment.appendChild(tag);
    });

    characterTagsBar.appendChild(fragment);
  }

  function renderComboCards(combos) {
    if (!comboGrid) return;
    comboGrid.innerHTML = '';

    if (combos.length === 0) {
      if (noResults) {
        noResults.classList.remove('hidden');
        noResults.style.display = 'block';
      }
      return;
    } else {
      if (noResults) {
        noResults.classList.add('hidden');
        noResults.style.display = 'none';
      }
    }

    const fragment = document.createDocumentFragment();

    combos.forEach((combo, index) => {
      const card = document.createElement('div');
      const delay = Math.min(index * 0.02, 0.25);
      card.style.animationDelay = `${delay}s`;
      card.className = 'card-animate soccer-card-hover spin-on-hover bg-pitch-card/95 backdrop-blur-md rounded-2xl border-2 border-pitch-border p-5 flex flex-col justify-between relative shadow-xl';

      const topBar = document.createElement('div');
      topBar.className = 'absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-teal-400 opacity-80 group-hover:opacity-100 transition-opacity';
      card.appendChild(topBar);

      const watermark = document.createElement('div');
      watermark.className = 'absolute top-3 right-3 text-emerald-500/10 text-4xl pointer-events-none';
      watermark.innerHTML = '<i class="fa-solid fa-futbol"></i>';
      card.appendChild(watermark);

      const contentWrapper = document.createElement('div');

      const headerDiv = document.createElement('div');
      headerDiv.className = 'mb-4 pr-6';
      
      const idBadge = `<div class="inline-flex items-center gap-1 text-[11px] font-tech font-bold text-amber-400 bg-emerald-950/90 px-2.5 py-0.5 rounded-md border border-emerald-700/60 mb-2 shadow-inner"><i class="fa-solid fa-trophy text-[10px]"></i> ${escapeHtml(combo.id)}</div>`;
      const title = `<h3 class="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors tracking-wide leading-snug font-sans">${escapeHtml(combo.combo_name)}</h3>`;

      headerDiv.innerHTML = idBadge + title;
      contentWrapper.appendChild(headerDiv);

      const charSection = document.createElement('div');
      charSection.className = 'mb-4';
      
      const charLabel = `<div class="text-[11px] font-tech uppercase text-emerald-400/80 mb-2 flex items-center gap-1.5 font-bold"><i class="fa-solid fa-users text-amber-400"></i> 発動メンバー (${combo.characters.length}名)</div>`;
      
      const tagsDiv = document.createElement('div');
      tagsDiv.className = 'flex flex-wrap gap-1.5';

      if (combo.characters.length > 0) {
        combo.characters.forEach(char => {
          const charBtn = document.createElement('button');
          const isSelected = char === selectedCharacterFilter;
          
          charBtn.className = isSelected 
            ? 'char-tag cursor-pointer px-3 py-1 rounded-xl text-xs font-bold bg-amber-500 text-black border border-amber-300 shadow-md font-sans'
            : 'char-tag cursor-pointer px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-950/80 hover:bg-amber-500 text-emerald-200 hover:text-black border border-emerald-700/60 hover:border-amber-300 font-sans transition-all flex items-center gap-1';
          
          charBtn.innerHTML = `<i class="fa-solid fa-shirt text-[10px]"></i><span>${escapeHtml(char)}</span>`;
          
          charBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedCharacterFilter = char;
            applyFilterAndSearch();
          });

          tagsDiv.appendChild(charBtn);
        });
      } else {
        tagsDiv.innerHTML = '<span class="text-xs text-emerald-600 italic">指定選手なし</span>';
      }

      charSection.innerHTML = charLabel;
      charSection.appendChild(tagsDiv);
      contentWrapper.appendChild(charSection);

      card.appendChild(contentWrapper);

      const footerDiv = document.createElement('div');
      footerDiv.className = 'pt-3 border-t border-emerald-900/60 mt-auto text-xs';

      if (combo.notes) {
        footerDiv.innerHTML = `
          <div class="flex items-start space-x-2 text-amber-300 bg-amber-950/40 p-2.5 rounded-xl border border-amber-700/50 shadow-inner">
            <i class="fa-solid fa-flag-checkered text-amber-400 mt-0.5 flex-shrink-0"></i>
            <span class="leading-relaxed font-medium">${escapeHtml(combo.notes)}</span>
          </div>
        `;
      } else {
        footerDiv.innerHTML = `
          <div class="text-emerald-500/50 italic text-[11px] flex items-center gap-1 font-tech">
            <i class="fa-solid fa-check text-emerald-600"></i>
            <span>発動特殊条件なし</span>
          </div>
        `;
      }

      card.appendChild(footerDiv);
      fragment.appendChild(card);
    });

    comboGrid.appendChild(fragment);
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // イベントリスナー設定
  searchInput?.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value;
    applyFilterAndSearch();
  });

  btnClearSearch?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    currentSearchQuery = '';
    applyFilterAndSearch();
    searchInput?.focus();
  });

  btnRemoveCharFilter?.addEventListener('click', () => {
    selectedCharacterFilter = null;
    applyFilterAndSearch();
  });

  btnResetAll?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    currentSearchQuery = '';
    selectedCharacterFilter = null;
    applyFilterAndSearch();
  });

  btnNoResultReset?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    currentSearchQuery = '';
    selectedCharacterFilter = null;
    applyFilterAndSearch();
  });

  // 実行開始
  fetchComboData();
}

// 超安心・即時実行ガード付きエントリーポイント
(function() {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initApp, 1);
  } else {
    document.addEventListener('DOMContentLoaded', initApp);
  }
})();
