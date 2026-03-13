// ==UserScript==
// @name         Za ile respi Elita II & Tytan
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Pokazuje timery elit II i tytanow z pelna integracja Lootlog
// @author       Kruul
// @match        https://*.margonem.pl/
// @updateURL    https://raw.githubusercontent.com/kruulxd/iledoe2/main/za-ile-respi-addon.user.js
// @downloadURL  https://raw.githubusercontent.com/kruulxd/iledoe2/main/za-ile-respi-addon.user.js
// @supportURL   https://github.com/kruulxd/iledoe2/issues
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const ELITE_II_DATA = {
        'Grota Dzikiego Kota': 'Mushita',
        'Las Tropicieli': 'Kotołak Tropiciel',
        'Przeklęta Strażnica - podziemia p.2 s.1': 'Shae Phu',
        'Schowek na Łupy': 'Zorg Jednooki Baron',
        'Podmokła Dolina': 'Władca rzek',
        'Jaskinia Pogardy': 'Gobbos',
        'Pieczara Kwiku - sala 2': 'Tyrtajos',
        'Skalne Turnie': 'Tollok Shimger',
        'Stary Kupiecki Trakt': 'Szczęt alias Gładki',
        'Mokra Grota p.2': 'Agar',
        'Stare Wyrobisko p.3': 'Razuglag Oklash',
        'Lazurytowa Grota p.4': 'Foverk Turrim',
        'Kopalnia Kapiącego Miodu p.2 - sala Owadziej Matki': 'Owadzia Matka',
        'Jaskinia Gnollich Szamanów - komnata Kozuga': 'Furruk Kozug',
        'Namiot Vari Krugera': 'Vari Kruger',
        'Kamienna Jaskinia - sala 3': 'Jotun',
        'Głębokie Skałki p.4': 'Tollok Utumutu',
        'Głębokie Skałki p.3': 'Tollok Atamatu',
        'Krypty Dusz Śniegu p.3 - komnata Lisza': 'Lisz',
        'Erem Czarnego Słońca p.5': 'Grabarz świątynny',
        'Firnowa Grota p.2 s.1': 'Wielka Stopa',
        'Świątynia Andarum - zbrojownia': 'Podły zbrojmistrz',
        'Wylęgarnia Choukkerów p.1': 'Choukker',
        'Kopalnia Margorii': 'Nadzorczyni krasnoludów',
        'Margoria - Sala Królewska': 'Morthen',
        'Zapomniany Święty Gaj p.3': 'Leśne Widmo',
        'Grota Samotnych Dusz p.6': 'Żelazoręki Ohydziarz',
        'Kamienna Strażnica - Sanktuarium': 'Goplana',
        'Zagrzybiałe Ścieżki p.3': 'Gnom Figlid',
        'Dolina Centaurów': 'Centaur Zyfryd',
        'Namiot Kambiona': 'Kambion',
        'Podziemia Zniszczonej Wieży p.5': 'Jertek Moxos',
        'Zabłocona Jama p.2 - Sala Błotnistych Odmętów': 'Miłośnik rycerzy',
        'Zabłocona Jama p.2 - Sala Magicznego Błota': 'Miłośnik magii',
        'Zabłocona Jama p.2 - Sala Duszącej Stęchlizny': 'Miłośnik łowców',
        'Skalne Cmentarzysko p.4': 'Łowca czaszek',
        'Piramida Pustynnego Władcy p.3': 'Ozirus Władca Hieroglifów',
        'Jama Morskiej Macki p.1 - sala 3': 'Morski potwór',
        'Opuszczony statek - pokład': 'Krab pustelnik',
        'Twierdza Rogogłowych - Sala Byka': 'Borgoros Garamir III',
        'Piaskowa Pułapka - Grota Piaskowej Śmierci': 'Stworzyciel',
        'Wulkan Politraki p.1 - sala 3': 'Ifryt',
        'Ukryta Grota Morskich Diabłów - magazyn': 'Młody Jack Truciciel',
        'Ukryta Grota Morskich Diabłów - siedziba': 'Helga Opiekunka Rumu',
        'Ukryta Grota Morskich Diabłów - skarbiec': 'Henry Kaprawe Oko',
        'Piaszczysta Grota p.1 - sala 2': 'Eol',
        'Kopalnia Żółtego Kruszcu p.2 - sala 2': 'Grubber Ochlaj',
        'Kuźnia Worundriela - Komnata Żaru': 'Mistrz Worundriel',
        'Chata wójta Fistuły p.1': 'Wójt Fistuła',
        'Chata Teściowej': 'Teściowa Rumcajsa',
        'Cenotaf Berserkerów p.1 - sala 2': 'Berserker Amuno',
        'Mała Twierdza - sala główna': 'Fodug Zolash',
        'Lokum Złych Goblinów - warsztat': 'Goons Asterus',
        'Laboratorium Adariel': 'Adariel',
        'Grota Orczej Hordy p.2 s.3': 'Burkog Lorulk',
        'Grota Orczych Szamanów p.3 s.1': 'Sheba Orcza Szamanka',
        'Nawiedzone Kazamaty p.4': 'Duch Władcy Klanów',
        'Sala Rady Orków': 'Bragarth Myśliwy Dusz / Fursharag Pożeracz Umysłów / Ziuggrael Strażnik Królowej',
        'Sala Królewska': 'Lusgrathera Królowa Pramatka',
        'Kryształowa Grota - Sala Smutku': 'Królowa Śniegu',
        'Drzewo Dusz p.2': 'Wrzosera / Chryzoprenia / Cantedewia',
        'Ogrza Kawerna p.4': 'Ogr Stalowy Pazur',
        'Krypty Bezsennych p.3': 'Torunia Ankelwald',
        'Skarpa Trzech Słów': 'Pięknotka Mięsożerna',
        'Przysiółek Valmirów': 'Breheret Żelazny Łeb',
        'Starodrzew Przedwiecznych p.2': 'Cerasus',
        'Szlamowe Kanały p.2 - sala 3': 'Mysiur Myświórowy Król',
        'Przerażające Sypialnie': 'Sadolia Nadzorczyni Hurys',
        'Sala Skaryfikacji Grzeszników': 'Sataniel Skrytobójca',
        'Sale Rozdzierania': 'Bergermona Krwawa Hrabina',
        'Tajemnicza Siedziba': 'Annaniel Wysysacz Marzeń / Gothardus Kolekcjoner Głów',
        'Sala Tysiąca Świec': 'Zufulus Smakosz Serc',
        'Zalana Grota': 'Czempion Furboli',
        'Arachnitopia p.6': 'Arachniregina Colosseus / Rycerz z za małym mieczem',
        'Erem Aldiphrina': 'Al\'diphrin Ilythirahel',
        'Ołtarz Pajęczej Bogini': 'Marlloth Malignitas',
        'Gnijące Topielisko': 'Arytodam olbrzymi',
        'Jaszczurze Korytarze p.2 - sala 5': 'Mocny Maddoks',
        'Gardziel Podgnitych Mchów p.3': 'Fangaj',
        'Źródło Zakorzenionego Ludu': 'Dendroculus',
        'Złota Góra p.3 - sala 2': 'Tolypeutes',
        'Chantli Cuaitla Citlalina': 'Cuaitl Citlalin',
        'Zachodni Mictlan p.9': 'Yaotl',
        'Wschodni Mictlan p.9': 'Quetzalcoatl',
        'Siedlisko Przyjemnej Woni - źródło': 'Wabicielka',
        'Potępione Zamczysko - pracownia': 'Pogardliwa Sybilla',
        'Katakumby Gwałtownej Śmierci': 'Chopesz',
        'Grobowiec Seta': 'Neferkar Set',
        'Urwisko Vapora': 'Terrozaur',
        'Świątynia Hebrehotha - sala ofiary': 'Vaenra Charkhaam',
        'Świątynia Hebrehotha - sala czciciela': 'Chaegd Agnrakh',
        'Drzewo Życia p.3': 'Nymphemonia',
        'Sala Lodowej Magii': 'Artenius',
        'Sala Mroźnych Strzał': 'Furion',
        'Sala Mroźnych Szeptów': 'Zorin'
    };

    const TITAN_DATA = {
        'Migotliwa Pieczara': 'Dziewicza Orlica',
        'Grota Caerbannoga - leże bestii': 'Zabójczy Królik',
        'Bandyckie Chowisko - skarbiec': 'Renegat Baulus',
        'Wulkan Politraki - Piekielne Czeluście': 'Piekielny Arcymag',
        'Lokum Złych Goblinów - pracownia': 'Versus Zoons',
        'Źródło Wspomnień': 'Łowczyni Wspomnień',
        'Komnata Krwawych Obrzędów': 'Przyzywacz Demonów',
        'Nora Jaszczurzych Koszmarów - źródło': 'Maddok Magua',
        'Teotihuacan': 'Tezcatlipoca',
        'Sala Zrujnowanej Świątyni': 'Barbatos Smoczy Strażnik',
        'Sala Tronowa': 'Tanroth'
    };

    let currentMapName = null;
    let lootlogTimers = {};
    let currentWorld = 'arkantes';
    let hasEliteAccess = false;
    let hasTitanAccess = false;

    function getWorld() {
        try {
            if (window.Engine?.worldConfig?.name) {
                return window.Engine.worldConfig.name.toLowerCase();
            }
            if (window.Engine?.worldName) {
                return window.Engine.worldName.toLowerCase();
            }
            const match = window.location.hostname.match(/^(\w+)\.margonem\.pl/);
            if (match) {
                return match[1].toLowerCase();
            }
            return 'arkantes';
        } catch (e) {
            return 'arkantes';
        }
    }

    function fetchLootlogTimers() {
        try {
            lootlogTimers = {};
            hasEliteAccess = false;
            hasTitanAccess = false;
            currentWorld = getWorld();
            
            const cacheStr = localStorage.getItem('ll:query-cache');
            if (cacheStr) {
                const cache = JSON.parse(cacheStr);
                if (cache.clientState && cache.clientState.queries) {
                    const timersQuery = cache.clientState.queries.find(
                        q => q.queryKey && q.queryKey[0] === 'guild-timers' && q.queryKey[1] === currentWorld
                    );
                    
                    if (timersQuery && timersQuery.state && timersQuery.state.data) {
                        const timers = timersQuery.state.data;
                        
                        timers.forEach(timer => {
                            if (timer.npc && (timer.npc.type === 'ELITE2' || timer.npc.type === 'TITAN') && timer.npc.name) {
                                const name = timer.npc.name;
                                
                                if (timer.npc.type === 'ELITE2') {
                                    hasEliteAccess = true;
                                } else if (timer.npc.type === 'TITAN') {
                                    hasTitanAccess = true;
                                }
                                
                                const now = Date.now();
                                const minTime = new Date(timer.minSpawnTime).getTime();
                                const maxTime = new Date(timer.maxSpawnTime).getTime();
                                
                                const remainingSeconds = Math.max(0, Math.floor((maxTime - now) / 1000));
                                const minRemainingSeconds = Math.max(0, Math.floor((minTime - now) / 1000));
                                
                                lootlogTimers[name] = {
                                    name: name,
                                    type: timer.npc.type,
                                    remainingSeconds: remainingSeconds,
                                    minRemainingSeconds: minRemainingSeconds,
                                    minSpawnTime: timer.minSpawnTime,
                                    maxSpawnTime: timer.maxSpawnTime,
                                    location: timer.npc.location
                                };
                            }
                        });
                        
                        if (Object.keys(lootlogTimers).length > 0) {
                            return;
                        }
                    }
                }
            }
            
            const lootlogTimerDiv = document.querySelector('.elite-timer-wnd, [class*="ll-timer"]');
            if (lootlogTimerDiv) {
                const timerText = lootlogTimerDiv.textContent;
                const timerRegex = /\[E2?\]\s*([^\d]+?)(\d{2}:\d{2}:\d{2})/g;
                let match;
                while ((match = timerRegex.exec(timerText)) !== null) {
                    const name = match[1].trim();
                    const time = match[2];
                    const [hours, minutes, seconds] = time.split(':').map(Number);
                    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
                    
                    lootlogTimers[name] = {
                        name: name,
                        remainingSeconds: totalSeconds,
                        timeString: time
                    };
                }
                
                if (Object.keys(lootlogTimers).length > 0) {
                    return;
                }
            }
        } catch (e) {
        }
    }

    function waitForEngine(callback) {
        if (window.Engine?.allInit && typeof window._g === 'function') {
            callback();
        } else {
            setTimeout(() => waitForEngine(callback), 100);
        }
    }

    function getCurrentMapName() {
        try {
            if (window.Engine?.map?.d?.name) {
                return window.Engine.map.d.name;
            }
            if (window.map?.name) {
                return window.map.name;
            }
            if (window.Engine?.map?.name) {
                return window.Engine.map.name;
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    function showToast(eliteName, lootlogTimer = null, index = 0, npcType = 'ELITE2') {
        const safeEliteName = eliteName.replace(/[^a-zA-Z0-9]/g, '-');
        const toastId = `elite-toast-${safeEliteName}`;
        
        const existingToast = document.getElementById(toastId);
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = 'elite-toast';
        
        const hasLootlogTimer = lootlogTimer && lootlogTimer.remainingSeconds !== undefined;
        const isTitan = lootlogTimer && lootlogTimer.type === 'TITAN';
        
        const bottomPosition = 60 + (index * 35);
        
        toast.style.cssText = `
            position: fixed;
            bottom: ${bottomPosition}px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(20, 20, 20, 0.75);
            color: #fff;
            padding: 8px 15px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 13px;
            font-weight: normal;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            z-index: 99999;
            animation: slideUp 0.3s ease-out;
            backdrop-filter: blur(5px);
        `;
        
        const timerElementId = `timer-${safeEliteName}`;
        
        if (hasLootlogTimer) {
            const totalSeconds = lootlogTimer.remainingSeconds;
            const minSeconds = lootlogTimer.minRemainingSeconds || 0;
            
            let timerColor = '#00ff88';
            let labelText = 'respi za';
            let nameColor = isTitan ? '#ff3333' : '#ff6b9d';
            
            if (isTitan) {
                if (minSeconds > 0) {
                    timerColor = '#fff';
                    labelText = 'respi za';
                } else {
                    timerColor = '#ffa500';
                    labelText = 'respi jeszcze przez';
                }
            }
            
            toast.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: ${nameColor}; font-weight: bold;">${eliteName}</span>
                    <span style="color: #aaa;">-</span>
                    <span style="color: #fff;">${labelText}</span>
                    <span id="${timerElementId}" style="color: ${timerColor}; font-weight: bold;">${formatTime(totalSeconds)}</span>
                </div>
            `;
        } else {
            let noTimerMessage, messageColor;
            let nameColor = npcType === 'TITAN' ? '#ff3333' : '#ff6b9d';
            
            if (npcType === 'TITAN') {
                const hasAccess = hasTitanAccess;
                noTimerMessage = hasAccess ? `${eliteName} wybity` : 'Brak dost\u0119pu do timera';
                messageColor = hasAccess ? '#ffaa00' : '#999';
            } else {
                noTimerMessage = 'nie ma na timerze';
                messageColor = '#999';
            }
            
            toast.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: ${nameColor}; font-weight: bold;">${eliteName}</span>
                    <span style="color: #aaa;">-</span>
                    <span style="color: ${messageColor};">${noTimerMessage}</span>
                </div>
            `;
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        if (!document.getElementById('elite-toast-style')) {
            style.id = 'elite-toast-style';
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);

        if (hasLootlogTimer) {
            const totalSeconds = lootlogTimer.remainingSeconds;
            const minSeconds = lootlogTimer.minRemainingSeconds || 0;
            let remainingSeconds = totalSeconds;
            let minRemainingSeconds = minSeconds;
            const timerElement = document.getElementById(timerElementId);
            
            const interval = setInterval(() => {
                remainingSeconds--;
                minRemainingSeconds--;
                
                if (remainingSeconds > 0 && timerElement) {
                    timerElement.textContent = formatTime(remainingSeconds);
                    
                    if (isTitan) {
                        const labelSpan = toast.querySelector('span[style*="color: #fff"]');
                        if (minRemainingSeconds > 0) {
                            timerElement.style.color = '#fff';
                            if (labelSpan && labelSpan.textContent !== 'respi za') {
                                labelSpan.textContent = 'respi za';
                            }
                        } else {
                            timerElement.style.color = '#ffa500';
                            if (labelSpan && labelSpan.textContent !== 'respi jeszcze przez') {
                                labelSpan.textContent = 'respi jeszcze przez';
                            }
                        }
                    }
                } else if (remainingSeconds <= 0) {
                    clearInterval(interval);
                    const nameColor = isTitan ? '#ff3333' : '#ff6b9d';
                    toast.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="color: ${nameColor}; font-weight: bold;">${eliteName}</span>
                            <span style="color: #aaa;">-</span>
                            <span style="color: #00ff88; font-weight: bold;">zrespił/a</span>
                        </div>
                    `;
                }
            }, 1000);

            // Usunięcie toastu po kliknięciu
            toast.addEventListener('click', () => {
                clearInterval(interval);
                toast.style.animation = 'fadeOut 0.2s ease-out';
                setTimeout(() => {
                    toast.remove();
                }, 200);
            });
        } else {
            toast.addEventListener('click', () => {
                toast.style.animation = 'fadeOut 0.2s ease-out';
                setTimeout(() => {
                    toast.remove();
                }, 200);
            });
        }

        toast.style.cursor = 'pointer';
        toast.title = 'Kliknij aby zamknąć';
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function removeAllToasts() {
        const toasts = document.querySelectorAll('.elite-toast');
        toasts.forEach(toast => {
            toast.style.animation = 'fadeOut 0.2s ease-out';
            setTimeout(() => {
                toast.remove();
            }, 200);
        });
    }

    function checkMapChange(forceRefresh = false) {
        const newMapName = getCurrentMapName();
        
        if (newMapName && (newMapName !== currentMapName || forceRefresh)) {
            if (newMapName !== currentMapName) {
                currentMapName = newMapName;
            }
            
            const eliteData = ELITE_II_DATA[currentMapName];
            const titanData = TITAN_DATA[currentMapName];
            const npcData = eliteData || titanData;
            const npcType = titanData ? 'TITAN' : 'ELITE2';
            
            if (npcData) {
                const npcNames = npcData.split('/').map(n => n.trim());
                npcNames.forEach((npcName, index) => {
                    let lootlogTimer = null;
                    if (lootlogTimers[npcName]) {
                        lootlogTimer = lootlogTimers[npcName];
                    } else {
                        for (const key in lootlogTimers) {
                            if (key.includes(npcName) || npcName.includes(key)) {
                                lootlogTimer = lootlogTimers[key];
                                break;
                            }
                        }
                    }
                    showToast(npcName, lootlogTimer, index, npcType);
                });
            } else {
                removeAllToasts();
            }
        }
    }

    function setupNpcKillListener() {
        try {
            window.addEventListener('storage', function(e) {
                if (e.key === 'll:query-cache' || e.key === null) {
                    fetchLootlogTimers();
                    setTimeout(() => {
                        const mapName = getCurrentMapName();
                        if (mapName && ELITE_II_DATA[mapName]) {
                            checkMapChange(true);
                        }
                    }, 1000);
                }
            });
            
            let lastCacheHash = '';
            setInterval(() => {
                try {
                    const cacheStr = localStorage.getItem('ll:query-cache');
                    if (cacheStr) {
                        const newHash = cacheStr.substring(0, 200);
                        if (lastCacheHash && lastCacheHash !== newHash) {
                            fetchLootlogTimers();
                            setTimeout(() => {
                                const mapName = getCurrentMapName();
                                if (mapName && ELITE_II_DATA[mapName]) {
                                    checkMapChange(true);
                                }
                            }, 500);
                        }
                        lastCacheHash = newHash;
                    }
                } catch (e) {
                }
            }, 10000);
            
            if (window.Engine?.battle) {
                const originalBattleEnd = window.Engine.battle.endBattle;
                if (typeof originalBattleEnd === 'function') {
                    window.Engine.battle.endBattle = function(...args) {
                        const result = originalBattleEnd.apply(this, args);
                        setTimeout(() => {
                            fetchLootlogTimers();
                            setTimeout(() => {
                                const mapName = getCurrentMapName();
                                if (mapName && ELITE_II_DATA[mapName]) {
                                    checkMapChange(true);
                                }
                            }, 1000);
                        }, 2000);
                        return result;
                    };
                }
            }
        } catch (e) {
        }
    }

    function init() {
        fetchLootlogTimers();
        
        setInterval(fetchLootlogTimers, 20000);
        
        checkMapChange();
        
        setInterval(checkMapChange, 2000);
        
        try {
            if (window.Engine?.map) {
                const originalMapChange = window.Engine.map.change;
                if (typeof originalMapChange === 'function') {
                    window.Engine.map.change = function(...args) {
                        originalMapChange.apply(this, args);
                        setTimeout(checkMapChange, 500);
                    };
                }
            }
        } catch (e) {
        }
        
        setupNpcKillListener();
    }

    waitForEngine(init);

})();
