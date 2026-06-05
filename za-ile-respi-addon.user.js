// ==UserScript==
// @name         Za ile respi Elita II & Tytan
// @namespace    http://tampermonkey.net/
// @version      1.6.3
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
    let toastPosition = localStorage.getItem('eliteToastPosition') || 'bottom-center';
    let matherWarningShown = false;

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

    function safeJsonParse(value) {
        if (typeof value !== 'string') return null;
        try {
            return JSON.parse(value);
        } catch (e) {
            return null;
        }
    }

    function toTimestamp(value) {
        if (value === null || value === undefined) return null;

        if (typeof value === 'number' && Number.isFinite(value)) {
            if (value > 1000000000000) return value;
            if (value > 1000000000) return value * 1000;
            return null;
        }

        if (typeof value === 'string') {
            const numeric = Number(value);
            if (Number.isFinite(numeric)) {
                return toTimestamp(numeric);
            }
            const parsed = Date.parse(value);
            return Number.isFinite(parsed) ? parsed : null;
        }

        return null;
    }

    function normalizeNpcType(rawType) {
        if (!rawType || typeof rawType !== 'string') return null;
        const type = rawType.toUpperCase();
        if (type.includes('ELITE2')) return 'ELITE2';
        if (type.includes('TITAN')) return 'TITAN';
        return null;
    }

    function isLootlogStorageKey(key) {
        if (!key || typeof key !== 'string') return false;
        if (key === 'll:query-cache') return true;
        if (key.startsWith('ll:')) return true;
        return /lootlog|guild-timers|query-cache|timers?/i.test(key);
    }

    function getLootlogStorageEntries() {
        const entries = [];

        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (!isLootlogStorageKey(key)) continue;
                const value = localStorage.getItem(key);
                if (typeof value !== 'string' || value.length < 2) continue;
                entries.push([key, value]);
            }
        } catch (e) {
        }

        entries.sort((a, b) => {
            if (a[0] === 'll:query-cache') return -1;
            if (b[0] === 'll:query-cache') return 1;
            return a[0].localeCompare(b[0]);
        });

        return entries;
    }

    function collectGuildTimerArrays(root, world) {
        const arrays = [];
        const seen = new WeakSet();

        function visit(node) {
            if (!node || typeof node !== 'object') return;
            if (seen.has(node)) return;
            seen.add(node);

            if (Array.isArray(node)) {
                node.forEach(visit);
                return;
            }

            const queryKey = node.queryKey;
            if (Array.isArray(queryKey) && queryKey[0] === 'guild-timers') {
                const queryWorld = String(queryKey[1] || '').toLowerCase();
                if (!world || !queryWorld || queryWorld === world) {
                    const data = node.state?.data ?? node.data ?? node.payload?.data;
                    if (Array.isArray(data)) {
                        arrays.push(data);
                    }
                }
            }

            if (typeof node.state === 'string') {
                const parsedState = safeJsonParse(node.state);
                if (parsedState) visit(parsedState);
            }
            if (typeof node.clientState === 'string') {
                const parsedClientState = safeJsonParse(node.clientState);
                if (parsedClientState) visit(parsedClientState);
            }

            Object.values(node).forEach(visit);
        }

        visit(root);
        return arrays;
    }

    function normalizeTimerEntry(timer, now) {
        if (!timer || typeof timer !== 'object') return null;

        const npc = timer.npc || timer.mob || timer.monster || timer.entity || {};
        const type = normalizeNpcType(
            npc.type || timer.type || timer.npcType || timer.mobType || timer.kind
        );
        const name =
            npc.name || timer.name || timer.npcName || timer.mobName || timer.entityName || null;

        if (!type || !name) return null;

        let minRaw =
            timer.minSpawnTime ??
            timer.minRespawnTime ??
            timer.minRespTime ??
            timer.minTime ??
            timer.respawnFrom;
        let maxRaw =
            timer.maxSpawnTime ??
            timer.maxRespawnTime ??
            timer.maxRespTime ??
            timer.maxTime ??
            timer.respawnTo ??
            timer.spawnTime;

        let minTime = toTimestamp(minRaw);
        let maxTime = toTimestamp(maxRaw);

        if (maxTime === null) {
            const remaining = Number(timer.remainingSeconds ?? timer.remaining ?? timer.timeLeft);
            if (Number.isFinite(remaining) && remaining >= 0) {
                maxTime = now + remaining * 1000;
            }
        }

        if (minTime === null) {
            minTime = maxTime;
        }

        if (maxTime === null) {
            return null;
        }

        return {
            name,
            type,
            remainingSeconds: Math.max(0, Math.floor((maxTime - now) / 1000)),
            minRemainingSeconds: Math.max(0, Math.floor((minTime - now) / 1000)),
            minSpawnTime: minRaw ?? null,
            maxSpawnTime: maxRaw ?? null,
            location: npc.location || timer.location || null,
            addedByName:
                timer.member?.name ||
                timer.addedByName ||
                timer.addedBy?.name ||
                timer.author?.name ||
                null
        };
    }

    function parseTimersFromLootlogStorage(world) {
        const now = Date.now();
        const parsedTimers = {};

        const entries = getLootlogStorageEntries();
        for (const [, rawValue] of entries) {
            const parsed = safeJsonParse(rawValue);
            if (!parsed) continue;

            const roots = [parsed];
            if (typeof parsed.state === 'string') {
                const parsedState = safeJsonParse(parsed.state);
                if (parsedState) roots.push(parsedState);
            }
            if (typeof parsed.clientState === 'string') {
                const parsedClientState = safeJsonParse(parsed.clientState);
                if (parsedClientState) roots.push(parsedClientState);
            }

            for (const root of roots) {
                const timerArrays = collectGuildTimerArrays(root, world);
                for (const timers of timerArrays) {
                    timers.forEach((timer) => {
                        const normalized = normalizeTimerEntry(timer, now);
                        if (!normalized) return;

                        const existing = parsedTimers[normalized.name];
                        if (!existing || normalized.remainingSeconds < existing.remainingSeconds) {
                            parsedTimers[normalized.name] = normalized;
                        }
                    });
                }
            }
        }

        return parsedTimers;
    }

    function fetchLootlogTimers(callback) {
        const doFetch = () => {
            try {
                lootlogTimers = {};
                hasEliteAccess = false;
                hasTitanAccess = false;
                currentWorld = getWorld();

                // Timeout na 5s — jeśli API nie odpowie, fallback
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                // Próba 1: Świeże dane z API (prioritet) - credentials: include wysyła cookies
                fetch(`https://api.lootlog.pl/timers?world=${encodeURIComponent(currentWorld)}`, {
                    credentials: 'include',
                    mode: 'cors',
                    signal: controller.signal
                })
                    .then(res => {
                        clearTimeout(timeoutId);
                        if (!res.ok) throw new Error('API status ' + res.status);
                        return res.json();
                    })
                    .then(timers => {
                        if (!Array.isArray(timers) || timers.length === 0) {
                            throw new Error('No timers in API');
                        }

                        timers.forEach(timer => {
                            if (timer?.npc?.name && (timer.npc.type === 'ELITE2' || timer.npc.type === 'TITAN')) {
                                const now = Date.now();
                                const maxTime = new Date(timer.maxSpawnTime).getTime();
                                const minTime = new Date(timer.minSpawnTime).getTime();

                                const name = timer.npc.name;
                                const timerData = {
                                    name: name,
                                    type: timer.npc.type,
                                    remainingSeconds: Math.max(0, Math.floor((maxTime - now) / 1000)),
                                    minRemainingSeconds: Math.max(0, Math.floor((minTime - now) / 1000)),
                                    minSpawnTime: timer.minSpawnTime,
                                    maxSpawnTime: timer.maxSpawnTime,
                                    location: timer.npc.location,
                                    addedByName: timer.member?.name || null
                                };

                                // Indeksuj po nazwie i lowercase dla szybkiego dostępu
                                lootlogTimers[name] = timerData;
                                lootlogTimers[name.toLowerCase()] = timerData;

                                if (timer.npc.type === 'ELITE2') hasEliteAccess = true;
                                else if (timer.npc.type === 'TITAN') hasTitanAccess = true;
                            }
                        });

                        // Callback w requestIdleCallback aby nie blokować gry
                        if (callback) {
                            if (typeof requestIdleCallback === 'function') {
                                requestIdleCallback(callback, { timeout: 500 });
                            } else {
                                callback();
                            }
                        }
                    })
                    .catch(apiError => {
                        clearTimeout(timeoutId);
                        // Próba 2: Fallback na cache jeśli API nie zadziała
                        const parsedTimers = parseTimersFromLootlogStorage(currentWorld);
                        Object.values(parsedTimers).forEach((timer) => {
                            lootlogTimers[timer.name] = timer;
                            lootlogTimers[timer.name.toLowerCase()] = timer;
                            if (timer.type === 'ELITE2') hasEliteAccess = true;
                            else if (timer.type === 'TITAN') hasTitanAccess = true;
                        });

                        if (Object.keys(lootlogTimers).length === 0) {
                            const lootlogTimerDiv = document.querySelector('.elite-timer-wnd, [class*="ll-timer"]');
                            if (lootlogTimerDiv) {
                                const timerText = lootlogTimerDiv.textContent;
                                const timerRegex = /\[E2?\]\s*([^\d]+?)(\d{2}:\d{2}:\d{2})/g;
                                let match;
                                while ((match = timerRegex.exec(timerText)) !== null) {
                                    const name = match[1].trim();
                                    const time = match[2];
                                    const [hours, minutes, seconds] = time.split(':').map(Number);
                                    lootlogTimers[name] = {
                                        name: name,
                                        remainingSeconds: hours * 3600 + minutes * 60 + seconds,
                                        timeString: time
                                    };
                                }
                            }
                        }

                        if (callback) {
                            if (typeof requestIdleCallback === 'function') {
                                requestIdleCallback(callback, { timeout: 500 });
                            } else {
                                callback();
                            }
                        }
                    });
            } catch (e) {
                console.error('[iledoe2] fetch error:', e);
                if (callback) callback();
            }
        };

        // Przenieś na requestIdleCallback żeby nie blokować gry
        if (typeof requestIdleCallback === 'function') {
            requestIdleCallback(doFetch, { timeout: 2000 });
        } else {
            setTimeout(doFetch, 0);
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

    function getGameCanvasBounds() {
        const canvas = document.getElementById('GAME_CANVAS');
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            return {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            };
        }
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }

    function getPositionStyle(index = 0) {
        const spacing = 35;
        const offset = 10;
        const bounds = getGameCanvasBounds();
        
        const positions = {
            'top-left': {
                top: `${bounds.top + offset + (index * spacing)}px`,
                left: `${bounds.left + offset}px`,
                transform: 'none'
            },
            'top-center': {
                top: `${bounds.top + offset + (index * spacing)}px`,
                left: `${bounds.left + bounds.width / 2}px`,
                transform: 'translateX(-50%)'
            },
            'top-right': {
                top: `${bounds.top + offset + (index * spacing)}px`,
                left: `${bounds.left + bounds.width - offset}px`,
                transform: 'translateX(-100%)'
            },
            'middle-left': {
                top: `${bounds.top + bounds.height / 2 + (index * spacing)}px`,
                left: `${bounds.left + offset}px`,
                transform: 'translateY(-50%)'
            },
            'middle-center': {
                top: `${bounds.top + bounds.height / 2 + (index * spacing)}px`,
                left: `${bounds.left + bounds.width / 2}px`,
                transform: 'translate(-50%, -50%)'
            },
            'middle-right': {
                top: `${bounds.top + bounds.height / 2 + (index * spacing)}px`,
                left: `${bounds.left + bounds.width - offset}px`,
                transform: 'translate(-100%, -50%)'
            },
            'bottom-left': {
                top: `${bounds.top + bounds.height - offset - (index * spacing) - 30}px`,
                left: `${bounds.left + offset}px`,
                transform: 'none'
            },
            'bottom-center': {
                top: `${bounds.top + bounds.height - offset - (index * spacing) - 30}px`,
                left: `${bounds.left + bounds.width / 2}px`,
                transform: 'translateX(-50%)'
            },
            'bottom-right': {
                top: `${bounds.top + bounds.height - offset - (index * spacing) - 30}px`,
                left: `${bounds.left + bounds.width - offset}px`,
                transform: 'translateX(-100%)'
            }
        };
        return positions[toastPosition] || positions['bottom-center'];
    }

    function showToast(eliteName, lootlogTimer = null, index = 0, npcType = 'ELITE2') {
        const safeEliteName = eliteName.replace(/[^a-zA-Z0-9]/g, '-');
        const toastId = `elite-toast-${safeEliteName}`;
        
        const existingToast = document.getElementById(toastId);
        const isNewToast = !existingToast;
        
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = 'elite-toast';
        
        const hasLootlogTimer = lootlogTimer && lootlogTimer.remainingSeconds !== undefined;
        const isTitan = lootlogTimer && lootlogTimer.type === 'TITAN';
        
        const posStyle = getPositionStyle(index);
        
        toast.style.cssText = `
            position: fixed;
            top: ${posStyle.top};
            left: ${posStyle.left};
            transform: ${posStyle.transform};
            background: rgba(20, 20, 20, 0.75);
            color: #fff;
            padding: 8px 15px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 13px;
            font-weight: normal;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            z-index: 99999;
            ${isNewToast ? 'animation: slideIn 0.3s ease-out;' : ''}
            backdrop-filter: blur(5px);
            pointer-events: auto;
        `;
        
        const timerElementId = `timer-${safeEliteName}`;
        
        if (hasLootlogTimer) {
            const totalSeconds = lootlogTimer.remainingSeconds;
            const minSeconds = lootlogTimer.minRemainingSeconds || 0;
            
            let timerColor = '#00ff88';
            let labelText = 'respi za';
            let labelColor = '#fff';
            let nameColor = isTitan ? '#ff3333' : '#ff6b9d';
            let displaySeconds = totalSeconds; // Co wyświetlać w timerze
            
            if (isTitan) {
                // Titan: sprawdzaj czy jesteśmy w cooldown czy w oknie respu
                if (minSeconds > 0) {
                    // Cooldown - czeka na otwarcie okna respu (wyświetl czas do minimum)
                    timerColor = '#fff';
                    labelText = 'zaczyna respa za';
                    labelColor = '#fff';
                    nameColor = '#ff3333';
                    displaySeconds = minSeconds; // Wyświetl czas do okna respu
                } else {
                    // W oknie respu - może się pojawić (wyświetl czas do maximum)
                    timerColor = '#ffa500';
                    labelText = 'respi jeszcze przez';
                    labelColor = '#ffa500';
                    nameColor = '#ff3333';
                    displaySeconds = totalSeconds; // Wyświetl czas do końca okna
                }
            }
            
            toast.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: ${nameColor}; font-weight: bold;">${eliteName}</span>
                    <span style="color: #aaa;">-</span>
                    <span style="color: ${labelColor};">${labelText}</span>
                    <span id="${timerElementId}" style="color: ${timerColor}; font-weight: bold;">${formatTime(displaySeconds)}</span>
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
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
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
                    if (isTitan) {
                        // Przełączaj kolory i tekst dla TITAN w zależności od okresu
                        const allSpans = toast.querySelectorAll('span');
                        const labelSpan = allSpans[2]; // label text span
                        
                        if (minRemainingSeconds > 0) {
                            // Cooldown - białe kolory, wyświetl czas do okna respu (minRemainingSeconds)
                            timerElement.style.color = '#fff';
                            labelSpan.style.color = '#fff';
                            labelSpan.textContent = 'zaczyna respa za';
                            timerElement.textContent = formatTime(minRemainingSeconds);
                        } else {
                            // Okno respu - pomarańczowe kolory, wyświetl czas do końca (remainingSeconds)
                            timerElement.style.color = '#ffa500';
                            labelSpan.style.color = '#ffa500';
                            labelSpan.textContent = 'respi jeszcze przez';
                            timerElement.textContent = formatTime(remainingSeconds);
                        }
                    } else {
                        // ELITE2 - zwykły countdown
                        timerElement.textContent = formatTime(remainingSeconds);
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

    function showMatherWarning() {
        const warningId = 'mather-warning';
        
        const heronameElement = document.querySelector('.heroname');
        const rawNick = heronameElement ? heronameElement.textContent.trim() : '';
        const currentPlayerNick = rawNick.replace(/\s*\(\d+p\)$/, '');
        
        console.log('[MATHER DEBUG] Raw nick from .heroname:', rawNick);
        console.log('[MATHER DEBUG] Cleaned nick:', currentPlayerNick);
        
        const matherNicks = [
            'Captain Plum',
            'Eldakhion',
            'Eukalion',
            'Girlan Led',
            'Grzegorz Braun',
            'Vargoth'
        ];
        
        const isExcluded = matherNicks.some(nick => nick.toLowerCase() === currentPlayerNick.toLowerCase());
        console.log('[MATHER DEBUG] Is excluded:', isExcluded);
        
        if (isExcluded) {
            matherWarningShown = true;
            console.log('[MATHER DEBUG] Ostrzeżenie zablokowane - jesteś na liście wykluczonych');
            return;
        }
        
        if (matherWarningShown) {
            return;
        }
        
        const existing = document.getElementById(warningId);
        if (existing) {
            return;
        }
        
        matherWarningShown = true;

        const bounds = getGameCanvasBounds();
        const warning = document.createElement('div');
        warning.id = warningId;
        
        warning.style.cssText = `
            position: fixed;
            top: ${bounds.top + bounds.height / 2}px;
            left: ${bounds.left + bounds.width / 2}px;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(139, 0, 0, 0.95), rgba(255, 69, 0, 0.95));
            color: #fff;
            padding: 20px 30px;
            border-radius: 12px;
            font-family: Arial, sans-serif;
            font-size: 24px;
            font-weight: bold;
            box-shadow: 0 0 30px rgba(255, 0, 0, 0.8), 0 0 60px rgba(255, 69, 0, 0.4);
            z-index: 100001;
            animation: warningPulse 1s ease-in-out infinite, warningFadeIn 0.5s ease-out;
            border: 3px solid rgba(255, 215, 0, 0.8);
            text-shadow: 0 0 10px rgba(255, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(5px);
            pointer-events: auto;
            cursor: pointer;
        `;
        
        warning.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px; justify-content: center;">
                <span style="font-size: 32px; animation: warningShake 0.5s ease-in-out infinite;">⚠️</span>
                <span style="letter-spacing: 2px;">UWAGA MATHER GRASUJE!</span>
                <span style="font-size: 32px; animation: warningShake 0.5s ease-in-out infinite;">⚠️</span>
            </div>
        `;
        
        // Dodaj style dla animacji
        const style = document.createElement('style');
        style.textContent = `
            @keyframes warningPulse {
                0%, 100% {
                    box-shadow: 0 0 30px rgba(255, 0, 0, 0.8), 0 0 60px rgba(255, 69, 0, 0.4);
                }
                50% {
                    box-shadow: 0 0 50px rgba(255, 0, 0, 1), 0 0 100px rgba(255, 69, 0, 0.6);
                }
            }
            @keyframes warningFadeIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            @keyframes warningShake {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-15deg); }
                75% { transform: rotate(15deg); }
            }
        `;
        if (!document.getElementById('mather-warning-style')) {
            style.id = 'mather-warning-style';
            document.head.appendChild(style);
        }
        
        document.body.appendChild(warning);
        
        warning.addEventListener('click', () => {
            warning.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => warning.remove(), 300);
        });
        
        warning.title = 'Kliknij aby zamknąć';
        
        setTimeout(() => {
            if (warning.parentNode) {
                warning.style.animation = 'fadeOut 0.5s ease-out';
                setTimeout(() => warning.remove(), 500);
            }
        }, 3000);
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
        const doCheck = () => {
            const newMapName = getCurrentMapName();
            
            if (newMapName && (newMapName !== currentMapName || forceRefresh)) {
                // Wyczyść stare toasty przy zmianie mapy
                if (newMapName !== currentMapName) {
                    removeAllToasts();
                    currentMapName = newMapName;
                    matherWarningShown = false;
                }
                
                const eliteData = ELITE_II_DATA[currentMapName];
                const titanData = TITAN_DATA[currentMapName];
                const npcData = eliteData || titanData;
                const npcType = titanData ? 'TITAN' : 'ELITE2';
                
                if (npcData) {
                    const npcNames = npcData.split('/').map(n => n.trim());
                    let matherDetected = false;
                    
                    npcNames.forEach((npcName, index) => {
                        let lootlogTimer = null;
                        const nameLower = npcName.toLowerCase();
                        
                        // Szybkie wyszukiwanie — najpierw exact match
                        if (lootlogTimers[npcName]) {
                            lootlogTimer = lootlogTimers[npcName];
                        } else if (lootlogTimers[nameLower]) {
                            lootlogTimer = lootlogTimers[nameLower];
                        } else {
                            // Tylko jeśli exact match nie zadziała — szukaj fuzzy
                            // Ale przejrzyj tylko pierwszych 20 kluczy (ELITE2 zwykle <10)
                            let count = 0;
                            for (const key in lootlogTimers) {
                                if (count++ > 20) break;
                                const keyLower = key.toLowerCase();
                                if (keyLower.includes(nameLower) || nameLower.includes(keyLower)) {
                                    lootlogTimer = lootlogTimers[key];
                                    break;
                                }
                            }
                        }
                        
                        if (lootlogTimer && lootlogTimer.addedByName && npcType === 'ELITE2') {
                            if (lootlogTimer.addedByName.toLowerCase().includes('ilmather')) {
                                matherDetected = true;
                            }
                        }
                        
                        showToast(npcName, lootlogTimer, index, npcType);
                    });
                    
                    if (matherDetected) {
                        showMatherWarning();
                    }
                } else {
                    removeAllToasts();
                }
            }
        };

        // Wykonaj gdy gra nie rysuje
        if (typeof requestIdleCallback === 'function') {
            requestIdleCallback(doCheck, { timeout: 1000 });
        } else {
            doCheck();
        }
    }

    function setupNpcKillListener() {
        try {
            // Storage event - gdy Lootlog sam zmienia coś lokalnie
            window.addEventListener('storage', function(e) {
                if (e.key === null || (e.key && e.key.startsWith('ll:'))) {
                    setTimeout(function() {
                        fetchLootlogTimers(function() {
                            const mapName = getCurrentMapName();
                            if (mapName && (ELITE_II_DATA[mapName] || TITAN_DATA[mapName])) {
                                checkMapChange(true);
                            }
                        });
                    }, 300);
                }
            });
            
            // Hook na koniec walki
            if (window.Engine && window.Engine.battle && window.Engine.battle.updateData) {
                const origUpdateData = window.Engine.battle.updateData;
                window.Engine.battle.updateData = function(data, isRound) {
                    const result = origUpdateData.call(this, data, isRound);
                    
                    if (data && data.endBattle && data.m) {
                        setTimeout(function() {
                            try {
                                let defeatedName = null;
                                const battleLog = data.m;
                                
                                for (let i = 0; i < battleLog.length; i++) {
                                    const line = battleLog[i];
                                    if (typeof line === 'string') {
                                        if (line.indexOf('loser=') >= 0) {
                                            const idx = line.indexOf('loser=');
                                            const rest = line.substring(idx + 6);
                                            const endIdx = rest.indexOf(';');
                                            defeatedName = endIdx >= 0 ? rest.substring(0, endIdx) : rest;
                                            break;
                                        }
                                    }
                                }
                                
                                if (defeatedName) {
                                    const currentMap = getCurrentMapName();
                                    if (currentMap) {
                                        const eliteData = ELITE_II_DATA[currentMap];
                                        const titanData = TITAN_DATA[currentMap];
                                        
                                        if (eliteData || titanData) {
                                            fetchLootlogTimers(function() {
                                                checkMapChange(true);
                                            });
                                        }
                                    }
                                }
                            } catch (err) {}
                        }, 500);
                    }
                    
                    return result;
                };
            }
            
            if (window.Engine?.battle) {
                const originalBattleEnd = window.Engine.battle.endBattle;
                if (typeof originalBattleEnd === 'function') {
                    window.Engine.battle.endBattle = function(...args) {
                        const result = originalBattleEnd.apply(this, args);
                        setTimeout(() => {
                            fetchLootlogTimers(() => {
                                const mapName = getCurrentMapName();
                                if (mapName && (ELITE_II_DATA[mapName] || TITAN_DATA[mapName])) {
                                    checkMapChange(true);
                                }
                            });
                        }, 2000);
                        return result;
                    };
                }
            }
        } catch (e) {
        }
    }

    function init() {
        fetchLootlogTimers(() => checkMapChange(true));
        
        setInterval(() => {
            fetchLootlogTimers(() => {
                const mapName = getCurrentMapName();
                if (mapName && (ELITE_II_DATA[mapName] || TITAN_DATA[mapName])) {
                    checkMapChange(true);
                }
            });
        }, 20000);
        
        setInterval(checkMapChange, 2000);
        
        try {
            if (window.Engine?.map) {
                const originalMapChange = window.Engine.map.change;
                if (typeof originalMapChange === 'function') {
                    window.Engine.map.change = function(...args) {
                        originalMapChange.apply(this, args);
                        setTimeout(() => checkMapChange(true), 500);
                    };
                }
            }
        } catch (e) {
        }
        
        setupNpcKillListener();
        createPositionSettings();
        
        window.addEventListener('resize', () => {
            const mapName = getCurrentMapName();
            if (mapName && (ELITE_II_DATA[mapName] || TITAN_DATA[mapName])) {
                checkMapChange(true);
            }
            
            const matherWarning = document.getElementById('mather-warning');
            if (matherWarning) {
                const bounds = getGameCanvasBounds();
                matherWarning.style.top = `${bounds.top + bounds.height / 2}px`;
                matherWarning.style.left = `${bounds.left + bounds.width / 2}px`;
            }
        });
    }

    function createPositionSettings() {
        const settingsButton = document.createElement('div');
        settingsButton.id = 'elite-position-settings-btn';
        settingsButton.innerHTML = '⚙️';
        
        function updateButtonPosition() {
            const bounds = getGameCanvasBounds();
            settingsButton.style.cssText = `
                position: fixed;
                top: ${bounds.top + bounds.height - 35}px;
                left: ${bounds.left + bounds.width - 35}px;
                width: 28px;
                height: 28px;
                background: rgba(20, 20, 20, 0.8);
                color: #fff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 14px;
                z-index: 99998;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                transition: all 0.2s;
                backdrop-filter: blur(5px);
            `;
        }
        
        updateButtonPosition();
        settingsButton.title = 'Ustawienia pozycji komunikatów E2/Tytan';
        
        settingsButton.addEventListener('mouseenter', () => {
            settingsButton.style.transform = 'scale(1.1)';
            settingsButton.style.background = 'rgba(40, 40, 40, 0.9)';
        });
        
        settingsButton.addEventListener('mouseleave', () => {
            settingsButton.style.transform = 'scale(1)';
            settingsButton.style.background = 'rgba(20, 20, 20, 0.8)';
        });
        
        settingsButton.addEventListener('click', () => {
            showPositionPanel();
        });
        
        document.body.appendChild(settingsButton);
        
        window.addEventListener('resize', updateButtonPosition);
    }

    function showPositionPanel() {
        const existingPanel = document.getElementById('elite-position-panel');
        if (existingPanel) {
            existingPanel.remove();
            return;
        }

        const panel = document.createElement('div');
        panel.id = 'elite-position-panel';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(20, 20, 20, 0.95);
            color: #fff;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            z-index: 100000;
            min-width: 240px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;

        const positions = [
            { value: 'top-left', label: '↖ Góra Lewo', icon: '↖' },
            { value: 'top-center', label: '⬆ Góra Środek', icon: '⬆' },
            { value: 'top-right', label: '↗ Góra Prawo', icon: '↗' },
            { value: 'middle-left', label: '⬅ Środek Lewo', icon: '⬅' },
            { value: 'middle-center', label: '⏺ Środek', icon: '⏺' },
            { value: 'middle-right', label: '➡ Środek Prawo', icon: '➡' },
            { value: 'bottom-left', label: '↙ Dół Lewo', icon: '↙' },
            { value: 'bottom-center', label: '⬇ Dół Środek', icon: '⬇' },
            { value: 'bottom-right', label: '↘ Dół Prawo', icon: '↘' }
        ];

        let html = `
            <div style="text-align: center; margin-bottom: 10px;">
                <h3 style="margin: 0 0 3px 0; color: #ff6b9d; font-size: 14px;">Pozycja komunikatów</h3>
                <p style="margin: 0; font-size: 10px; color: #999;">Wybierz gdzie mają się wyświetlać timery</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 12px;">
        `;

        positions.forEach(pos => {
            const isActive = toastPosition === pos.value;
            html += `
                <button 
                    class="position-btn" 
                    data-position="${pos.value}"
                    style="
                        padding: 8px 6px;
                        background: ${isActive ? 'rgba(255, 107, 157, 0.3)' : 'rgba(50, 50, 50, 0.5)'};
                        border: 2px solid ${isActive ? '#ff6b9d' : 'rgba(255, 255, 255, 0.1)'};
                        color: #fff;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 18px;
                        transition: all 0.2s;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    "
                    onmouseover="this.style.background='rgba(255, 107, 157, 0.2)'; this.style.borderColor='#ff6b9d';"
                    onmouseout="this.style.background='${isActive ? 'rgba(255, 107, 157, 0.3)' : 'rgba(50, 50, 50, 0.5)'}'; this.style.borderColor='${isActive ? '#ff6b9d' : 'rgba(255, 255, 255, 0.1)'}';"
                >${pos.icon}</button>
            `;
        });

        html += `
            </div>
            <div style="text-align: center; font-size: 10px; color: #aaa; margin-bottom: 8px;">
                Aktualna: <span style="color: #ff6b9d; font-weight: bold;">${positions.find(p => p.value === toastPosition).label}</span>
            </div>
            <button id="close-position-panel" style="
                width: 100%;
                padding: 8px;
                background: rgba(100, 100, 100, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #fff;
                border-radius: 6px;
                cursor: pointer;
                font-size: 11px;
                transition: all 0.2s;
            "
            onmouseover="this.style.background='rgba(150, 150, 150, 0.3)';"
            onmouseout="this.style.background='rgba(100, 100, 100, 0.3)';"
            >Zamknij</button>
        `;

        panel.innerHTML = html;
        document.body.appendChild(panel);

        panel.querySelectorAll('.position-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const newPosition = btn.getAttribute('data-position');
                toastPosition = newPosition;
                localStorage.setItem('eliteToastPosition', newPosition);
                panel.remove();
                removeAllToasts();
                setTimeout(() => checkMapChange(true), 100);
            });
        });

        document.getElementById('close-position-panel').addEventListener('click', () => {
            panel.remove();
        });

        setTimeout(() => {
            document.addEventListener('click', function closePanel(e) {
                if (!panel.contains(e.target) && e.target.id !== 'elite-position-settings-btn') {
                    panel.remove();
                    document.removeEventListener('click', closePanel);
                }
            });
        }, 100);
    }

    waitForEngine(init);

})();
