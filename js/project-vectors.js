/**
 * Bespoke Vector Graphics & Favicon Logos for Web Architecture Projects
 * Provides ultra-crisp, high-fidelity SVGs replacing generic stock photography.
 */
(function() {
    const VECTORS = {
        'adetech': {
            name: 'Adetech Global',
            monogram: 'AT',
            primary: '#00F0FF',
            secondary: '#E6C280',
            bgStart: '#0A1118',
            bgEnd: '#131F2E',
            iconPath: '<rect x="25" y="20" width="50" height="15" rx="3" fill="none" stroke="#00F0FF" stroke-width="3"/><circle cx="35" cy="27.5" r="2.5" fill="#00F0FF"/><circle cx="45" cy="27.5" r="2.5" fill="#E6C280"/><rect x="25" y="42" width="50" height="15" rx="3" fill="none" stroke="#00F0FF" stroke-width="3"/><circle cx="35" cy="49.5" r="2.5" fill="#00F0FF"/><circle cx="45" cy="49.5" r="2.5" fill="#E6C280"/><rect x="25" y="65" width="50" height="15" rx="3" fill="none" stroke="#00F0FF" stroke-width="3"/><circle cx="35" cy="72.5" r="2.5" fill="#00F0FF"/><circle cx="45" cy="72.5" r="2.5" fill="#E6C280"/><path d="M50 35 V42 M50 57 V65 M60 27.5 H70 M60 49.5 H70 M60 72.5 H70" stroke="#E6C280" stroke-width="2"/>',
            bannerDetail: '<g opacity="0.4"><line x1="0" y1="50" x2="600" y2="50" stroke="#00F0FF" stroke-width="1" stroke-dasharray="4 8"/><line x1="0" y1="120" x2="600" y2="120" stroke="#00F0FF" stroke-width="1" stroke-dasharray="4 8"/><line x1="0" y1="200" x2="600" y2="200" stroke="#00F0FF" stroke-width="1" stroke-dasharray="4 8"/><line x1="0" y1="280" x2="600" y2="280" stroke="#00F0FF" stroke-width="1" stroke-dasharray="4 8"/></g><rect x="60" y="70" width="180" height="200" rx="8" fill="#121820" stroke="#00F0FF" stroke-width="2"/><rect x="80" y="95" width="140" height="24" rx="4" fill="#1A2430" stroke="#00F0FF" stroke-width="1"/><circle cx="95" cy="107" r="4" fill="#00F0FF"/><circle cx="110" cy="107" r="4" fill="#E6C280"/><rect x="80" y="135" width="140" height="24" rx="4" fill="#1A2430" stroke="#00F0FF" stroke-width="1"/><circle cx="95" cy="147" r="4" fill="#00F0FF"/><circle cx="110" cy="147" r="4" fill="#E6C280"/><rect x="80" y="175" width="140" height="24" rx="4" fill="#1A2430" stroke="#00F0FF" stroke-width="1"/><circle cx="95" cy="187" r="4" fill="#00F0FF"/><circle cx="110" cy="187" r="4" fill="#E6C280"/><rect x="80" y="215" width="140" height="24" rx="4" fill="#1A2430" stroke="#00F0FF" stroke-width="1"/><circle cx="95" cy="227" r="4" fill="#00F0FF"/><circle cx="110" cy="227" r="4" fill="#E6C280"/><path d="M240 107 H340 M240 147 H360 M240 187 H340 M240 227 H380" stroke="#E6C280" stroke-width="2" stroke-dasharray="6 4"/><circle cx="340" cy="107" r="6" fill="#00F0FF"/><circle cx="360" cy="147" r="6" fill="#E6C280"/><circle cx="340" cy="187" r="6" fill="#00F0FF"/><circle cx="380" cy="227" r="6" fill="#E6C280"/><polygon points="450,90 530,135 530,225 450,270 370,225 370,135" fill="none" stroke="#00F0FF" stroke-width="2"/><polygon points="450,115 505,147 505,212 450,245 395,212 395,147" fill="#101824" stroke="#E6C280" stroke-width="1.5"/><text x="450" y="188" font-family="monospace" font-size="28" font-weight="bold" fill="#F5E6C8" text-anchor="middle">AT</text>'
        },
        'aetheria': {
            name: 'Aetheria Real Estate',
            monogram: 'AE',
            primary: '#F59E0B',
            secondary: '#E6C280',
            bgStart: '#14120E',
            bgEnd: '#261F14',
            iconPath: '<polygon points="50,15 85,35 85,80 50,95 15,80 15,35" fill="none" stroke="#E6C280" stroke-width="3"/><polyline points="50,15 50,95 M85,35 50,55 15,35" stroke="#F59E0B" stroke-width="2.5"/><line x1="32" y1="45" x2="32" y2="87" stroke="#E6C280" stroke-width="1.5" stroke-dasharray="2 2"/><line x1="68" y1="45" x2="68" y2="87" stroke="#E6C280" stroke-width="1.5" stroke-dasharray="2 2"/>',
            bannerDetail: '<g opacity="0.3"><pattern id="grid-ae" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E6C280" stroke-width="0.5"/></pattern><rect width="600" height="340" fill="url(#grid-ae)"/></g><polygon points="300,50 510,140 300,230 90,140" fill="#1A1510" stroke="#E6C280" stroke-width="2"/><polygon points="300,75 470,145 300,215 130,145" fill="none" stroke="#F59E0B" stroke-width="1.5"/><polygon points="90,140 300,230 300,290 90,200" fill="#15120D" stroke="#E6C280" stroke-width="2"/><polygon points="510,140 300,230 300,290 510,200" fill="#201A12" stroke="#E6C280" stroke-width="2"/><line x1="200" y1="190" x2="200" y2="250" stroke="#FFF3CD" stroke-width="1.5"/><line x1="230" y1="200" x2="230" y2="260" stroke="#FFF3CD" stroke-width="1.5"/><line x1="370" y1="200" x2="370" y2="260" stroke="#FFF3CD" stroke-width="1.5"/><line x1="400" y1="190" x2="400" y2="250" stroke="#FFF3CD" stroke-width="1.5"/><circle cx="300" cy="140" r="28" fill="#120E09" stroke="#E6C280" stroke-width="2"/><text x="300" y="148" font-family="serif" font-size="20" font-weight="bold" fill="#F5E6C8" text-anchor="middle">AE</text>'
        },
        'apex-logistics': {
            name: 'Apex Logistics',
            monogram: 'AL',
            primary: '#38BDF8',
            secondary: '#F59E0B',
            bgStart: '#081320',
            bgEnd: '#112238',
            iconPath: '<circle cx="50" cy="50" r="35" fill="none" stroke="#38BDF8" stroke-width="3"/><ellipse cx="50" cy="50" rx="35" ry="14" fill="none" stroke="#38BDF8" stroke-width="2"/><line x1="15" y1="50" x2="85" y2="50" stroke="#38BDF8" stroke-width="2"/><path d="M30 30 L50 15 L70 30 L60 30 L60 65 L40 65 L40 30 Z" fill="#F59E0B"/>',
            bannerDetail: '<circle cx="300" cy="170" r="100" fill="none" stroke="#38BDF8" stroke-width="2" stroke-dasharray="6 6"/><ellipse cx="300" cy="170" rx="100" ry="40" fill="none" stroke="#38BDF8" stroke-width="1.5"/><ellipse cx="300" cy="170" rx="40" ry="100" fill="none" stroke="#38BDF8" stroke-width="1.5"/><path d="M120 220 Q 300 70 480 200" fill="none" stroke="#F59E0B" stroke-width="3" stroke-dasharray="8 6"/><polygon points="480,200 460,190 468,205" fill="#F59E0B"/><polygon points="120,220 140,210 132,225" fill="#F59E0B"/><rect x="250" y="130" width="100" height="80" rx="10" fill="#0A1828" stroke="#38BDF8" stroke-width="2"/><text x="300" y="178" font-family="monospace" font-size="28" font-weight="bold" fill="#38BDF8" text-anchor="middle">AL</text>'
        },
        'atelier-monarch': {
            name: 'Atelier Monarch',
            monogram: 'AM',
            primary: '#E6C280',
            secondary: '#FBBF24',
            bgStart: '#181512',
            bgEnd: '#292218',
            iconPath: '<circle cx="50" cy="50" r="32" fill="none" stroke="#E6C280" stroke-width="3"/><circle cx="50" cy="50" r="24" fill="none" stroke="#FBBF24" stroke-width="1.5" stroke-dasharray="3 3"/><line x1="50" y1="50" x2="50" y2="30" stroke="#F5E6C8" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="50" x2="65" y2="50" stroke="#E6C280" stroke-width="2.5" stroke-linecap="round"/><polygon points="50,12 55,20 45,20" fill="#E6C280"/><polygon points="50,88 55,80 45,80" fill="#E6C280"/>',
            bannerDetail: '<circle cx="300" cy="170" r="110" fill="none" stroke="#E6C280" stroke-width="2"/><circle cx="300" cy="170" r="95" fill="#1E1912" stroke="#FBBF24" stroke-width="1.5" stroke-dasharray="4 6"/><g stroke="#E6C280" stroke-width="2"><line x1="300" y1="78" x2="300" y2="92"/><line x1="300" y1="248" x2="300" y2="262"/><line x1="208" y1="170" x2="222" y2="170"/><line x1="378" y1="170" x2="392" y2="170"/></g><line x1="300" y1="170" x2="300" y2="105" stroke="#F5E6C8" stroke-width="4" stroke-linecap="round"/><line x1="300" y1="170" x2="365" y2="170" stroke="#E6C280" stroke-width="3" stroke-linecap="round"/><circle cx="300" cy="170" r="12" fill="#E6C280"/><path d="M260 270 Q300 250 340 270" fill="none" stroke="#E6C280" stroke-width="2"/><text x="300" y="220" font-family="serif" font-size="22" letter-spacing="4" font-weight="bold" fill="#F5E6C8" text-anchor="middle">AM</text>'
        },
        'aura-techie': {
            name: 'Aura Techie',
            monogram: 'AT',
            primary: '#A855F7',
            secondary: '#F43F5E',
            bgStart: '#140A22',
            bgEnd: '#25123A',
            iconPath: '<path d="M50 15 L58 38 L82 40 L64 55 L70 80 L50 66 L30 80 L36 55 L18 40 L42 38 Z" fill="none" stroke="#A855F7" stroke-width="3"/><circle cx="50" cy="50" r="14" fill="#F43F5E" opacity="0.8"/>',
            bannerDetail: '<polygon points="180,80 420,80 340,240 260,240" fill="none" stroke="#A855F7" stroke-width="3"/><ellipse cx="300" cy="80" rx="120" ry="24" fill="#200E35" stroke="#F43F5E" stroke-width="2"/><ellipse cx="300" cy="160" rx="75" ry="16" fill="none" stroke="#A855F7" stroke-width="2" stroke-dasharray="4 4"/><ellipse cx="300" cy="240" rx="40" ry="10" fill="#F43F5E" opacity="0.7"/><path d="M120 260 Q 220 220 300 120 T 480 60" fill="none" stroke="#E6C280" stroke-width="3"/><circle cx="480" cy="60" r="8" fill="#E6C280"/><text x="300" y="166" font-family="monospace" font-size="24" font-weight="bold" fill="#FFFFFF" text-anchor="middle">AT</text>'
        },
        'cito': {
            name: 'Cito Digital',
            monogram: 'CT',
            primary: '#0284C7',
            secondary: '#38BDF8',
            bgStart: '#0A1726',
            bgEnd: '#132B45',
            iconPath: '<polygon points="50,15 80,75 50,62 20,75" fill="#0284C7" stroke="#38BDF8" stroke-width="3"/><circle cx="50" cy="45" r="6" fill="#F5E6C8"/>',
            bannerDetail: '<polygon points="300,50 440,230 300,185 160,230" fill="#0E2338" stroke="#38BDF8" stroke-width="3"/><polygon points="300,90 395,210 300,180 205,210" fill="none" stroke="#E6C280" stroke-width="2"/><line x1="300" y1="50" x2="300" y2="280" stroke="#00F0FF" stroke-width="2" stroke-dasharray="6 4"/><circle cx="300" cy="140" r="16" fill="#0284C7"/><text x="300" y="147" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">CT</text>'
        },
        'creative-design-apparel': {
            name: 'Creative Design Apparel',
            monogram: 'CD',
            primary: '#F472B6',
            secondary: '#FBBF24',
            bgStart: '#1A0C18',
            bgEnd: '#2D1629',
            iconPath: '<path d="M30 25 L45 35 L50 25 L55 35 L70 25 L85 45 L75 55 L70 85 L30 85 L25 55 L15 45 Z" fill="none" stroke="#F472B6" stroke-width="3"/><line x1="30" y1="55" x2="70" y2="55" stroke="#FBBF24" stroke-width="2"/>',
            bannerDetail: '<rect x="180" y="60" width="240" height="220" rx="16" fill="#20101F" stroke="#F472B6" stroke-width="2"/><g stroke="#FBBF24" stroke-width="1" opacity="0.6"><line x1="200" y1="60" x2="200" y2="280"/><line x1="240" y1="60" x2="240" y2="280"/><line x1="280" y1="60" x2="280" y2="280"/><line x1="320" y1="60" x2="320" y2="280"/><line x1="360" y1="60" x2="360" y2="280"/><line x1="400" y1="60" x2="400" y2="280"/><line x1="180" y1="100" x2="420" y2="100"/><line x1="180" y1="140" x2="420" y2="140"/><line x1="180" y1="180" x2="420" y2="180"/><line x1="180" y1="220" x2="420" y2="220"/></g><circle cx="300" cy="170" r="40" fill="#140A13" stroke="#E6C280" stroke-width="2"/><text x="300" y="179" font-family="serif" font-size="26" font-weight="bold" fill="#F472B6" text-anchor="middle">CD</text>'
        },
        'devflow-copilot': {
            name: 'DevFlow Copilot',
            monogram: 'DF',
            primary: '#58A6FF',
            secondary: '#3FB950',
            bgStart: '#0D1117',
            bgEnd: '#161B22',
            iconPath: '<rect x="15" y="20" width="70" height="60" rx="8" fill="none" stroke="#58A6FF" stroke-width="3"/><path d="M30 40 L45 50 L30 60" fill="none" stroke="#3FB950" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="60" x2="68" y2="60" stroke="#E6C280" stroke-width="3"/>',
            bannerDetail: '<rect x="100" y="50" width="400" height="240" rx="12" fill="#0D1117" stroke="#30363D" stroke-width="2"/><rect x="100" y="50" width="400" height="35" rx="12" fill="#161B22"/><circle cx="125" cy="67" r="5" fill="#FF5F56"/><circle cx="145" cy="67" r="5" fill="#FFBD2E"/><circle cx="165" cy="67" r="5" fill="#27C93F"/><text x="300" y="73" font-family="monospace" font-size="12" fill="#8B949E" text-anchor="middle">devflow-copilot --workspace</text><path d="M140 120 L165 140 L140 160" fill="none" stroke="#3FB950" stroke-width="3" stroke-linecap="round"/><line x1="175" y1="160" x2="210" y2="160" stroke="#58A6FF" stroke-width="3"/><path d="M140 190 H 260 V 220 H 380" fill="none" stroke="#58A6FF" stroke-width="2" stroke-dasharray="4 4"/><circle cx="260" cy="190" r="6" fill="#3FB950"/><circle cx="380" cy="220" r="6" fill="#E6C280"/><text x="440" y="225" font-family="monospace" font-size="14" font-weight="bold" fill="#58A6FF">DF</text>'
        },
        'flow-os': {
            name: 'Flow OS',
            monogram: 'FO',
            primary: '#60A5FA',
            secondary: '#C084FC',
            bgStart: '#0C1322',
            bgEnd: '#1A233A',
            iconPath: '<rect x="18" y="22" width="42" height="32" rx="4" fill="#1A233A" stroke="#60A5FA" stroke-width="2.5"/><rect x="38" y="42" width="44" height="34" rx="4" fill="#0C1322" stroke="#C084FC" stroke-width="2.5"/><line x1="18" y1="30" x2="60" y2="30" stroke="#60A5FA" stroke-width="1.5"/><line x1="38" y1="50" x2="82" y2="50" stroke="#C084FC" stroke-width="1.5"/>',
            bannerDetail: '<rect x="120" y="60" width="220" height="150" rx="8" fill="#141E33" stroke="#60A5FA" stroke-width="2"/><rect x="120" y="60" width="220" height="24" fill="#1E2C4A"/><circle cx="135" cy="72" r="3.5" fill="#60A5FA"/><circle cx="148" cy="72" r="3.5" fill="#C084FC"/><rect x="260" y="120" width="220" height="150" rx="8" fill="#0F172A" stroke="#C084FC" stroke-width="2"/><rect x="260" y="120" width="220" height="24" fill="#1A1F36"/><circle cx="275" cy="132" r="3.5" fill="#C084FC"/><circle cx="288" cy="132" r="3.5" fill="#60A5FA"/><rect x="100" y="290" width="400" height="30" rx="8" fill="#0B0F19" stroke="#334155" stroke-width="1"/><circle cx="125" cy="305" r="7" fill="#60A5FA"/><circle cx="150" cy="305" r="7" fill="#C084FC"/><circle cx="175" cy="305" r="7" fill="#E6C280"/><text x="450" y="310" font-family="monospace" font-size="14" font-weight="bold" fill="#60A5FA">FO</text>'
        },
        'study-pulse': {
            name: 'Study Pulse',
            monogram: 'SP',
            primary: '#818CF8',
            secondary: '#FDE047',
            bgStart: '#141432',
            bgEnd: '#242454',
            iconPath: '<path d="M15 50 Q 30 50 38 35 T 50 65 T 62 25 T 70 50 H 85" fill="none" stroke="#818CF8" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="50" r="35" fill="none" stroke="#FDE047" stroke-width="2" stroke-dasharray="5 5"/>',
            bannerDetail: '<circle cx="300" cy="170" r="90" fill="#16163A" stroke="#818CF8" stroke-width="2"/><path d="M120 170 Q 200 170 240 110 T 300 230 T 360 90 T 400 170 H 480" fill="none" stroke="#FDE047" stroke-width="4" stroke-linecap="round"/><circle cx="300" cy="170" r="18" fill="#818CF8"/><text x="300" y="177" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">SP</text>'
        },
        'maison-there': {
            name: 'MAISON THÉRÈSE',
            monogram: 'MT',
            primary: '#E6C280',
            secondary: '#FFFFFF',
            bgStart: '#141414',
            bgEnd: '#262626',
            iconPath: '<polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="none" stroke="#E6C280" stroke-width="2.5"/><polyline points="50,15 50,95 M85,35 50,55 15,35" stroke="#FFFFFF" stroke-width="1.5"/>',
            bannerDetail: '<polygon points="300,50 490,135 300,220 110,135" fill="#1A1A1A" stroke="#E6C280" stroke-width="2"/><polygon points="110,135 300,220 300,290 110,205" fill="#141414" stroke="#E6C280" stroke-width="2"/><polygon points="490,135 300,220 300,290 490,205" fill="#222222" stroke="#E6C280" stroke-width="2"/><line x1="300" y1="50" x2="300" y2="220" stroke="#FFF3CD" stroke-width="1.5"/><circle cx="300" cy="135" r="28" fill="#0D0F12" stroke="#E6C280" stroke-width="2"/><text x="300" y="144" font-family="serif" font-size="22" letter-spacing="3" font-weight="bold" fill="#F5E6C8" text-anchor="middle">MT</text>'
        },
        'medstream': {
            name: 'Medstream',
            monogram: 'MS',
            primary: '#2DD4BF',
            secondary: '#38BDF8',
            bgStart: '#062024',
            bgEnd: '#0F383E',
            iconPath: '<rect x="42" y="18" width="16" height="64" rx="4" fill="#2DD4BF"/><rect x="18" y="42" width="64" height="16" rx="4" fill="#2DD4BF"/><path d="M12 50 H35 L42 30 L50 70 L58 40 L65 50 H88" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>',
            bannerDetail: '<rect x="200" y="60" width="200" height="220" rx="24" fill="#08282D" stroke="#2DD4BF" stroke-width="2"/><rect x="280" y="90" width="40" height="160" rx="8" fill="#2DD4BF" opacity="0.3"/><rect x="220" y="150" width="160" height="40" rx="8" fill="#2DD4BF" opacity="0.3"/><path d="M100 170 H 230 L 260 110 L 290 230 L 320 130 L 345 190 L 365 170 H 500" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/><circle cx="300" cy="70" r="14" fill="#2DD4BF"/><text x="300" y="75" font-family="monospace" font-size="12" font-weight="bold" fill="#062024" text-anchor="middle">MS</text>'
        },
        'my-portfolio': {
            name: 'HODM Portfolio Archive',
            monogram: 'HM',
            primary: '#E6C280',
            secondary: '#FFF3CD',
            bgStart: '#12161A',
            bgEnd: '#1F2730',
            iconPath: '<polygon points="50,15 85,80 15,80" fill="none" stroke="#E6C280" stroke-width="3"/><circle cx="50" cy="55" r="16" fill="#12161A" stroke="#FFF3CD" stroke-width="2"/><text x="50" y="61" font-family="serif" font-size="15" font-weight="bold" fill="#E6C280" text-anchor="middle">HM</text>',
            bannerDetail: '<polygon points="300,50 480,260 120,260" fill="#151C24" stroke="#E6C280" stroke-width="3"/><polygon points="300,90 440,245 160,245" fill="none" stroke="#FFF3CD" stroke-width="1.5" stroke-dasharray="4 4"/><circle cx="300" cy="180" r="42" fill="#0E1318" stroke="#E6C280" stroke-width="2"/><text x="300" y="192" font-family="serif" font-size="34" font-weight="bold" fill="#F5E6C8" text-anchor="middle">HM</text>'
        },
        'mykesyte': {
            name: 'MykeSyte Studio',
            monogram: 'MK',
            primary: '#D946EF',
            secondary: '#F59E0B',
            bgStart: '#1C0D2E',
            bgEnd: '#2D1647',
            iconPath: '<polygon points="50,15 85,75 15,75" fill="none" stroke="#D946EF" stroke-width="3"/><line x1="50" y1="15" x2="85" y2="45" stroke="#F59E0B" stroke-width="2"/><line x1="50" y1="15" x2="90" y2="60" stroke="#38BDF8" stroke-width="2"/><line x1="50" y1="15" x2="95" y2="75" stroke="#10B981" stroke-width="2"/>',
            bannerDetail: '<polygon points="260,80 380,250 140,250" fill="#1F0E33" stroke="#D946EF" stroke-width="3"/><line x1="80" y1="170" x2="210" y2="170" stroke="#FFFFFF" stroke-width="3"/><line x1="210" y1="170" x2="310" y2="120" stroke="#EF4444" stroke-width="2"/><line x1="210" y1="170" x2="330" y2="140" stroke="#F59E0B" stroke-width="2"/><line x1="210" y1="170" x2="350" y2="160" stroke="#10B981" stroke-width="2"/><line x1="210" y1="170" x2="370" y2="180" stroke="#38BDF8" stroke-width="2"/><line x1="210" y1="170" x2="390" y2="200" stroke="#8B5CF6" stroke-width="2"/><circle cx="460" cy="160" r="28" fill="#150B22" stroke="#D946EF" stroke-width="2"/><text x="460" y="168" font-family="monospace" font-size="20" font-weight="bold" fill="#D946EF" text-anchor="middle">MK</text>'
        },
        'nexnova': {
            name: 'NexNova DevOps Core',
            monogram: 'NN',
            primary: '#06B6D4',
            secondary: '#8B5CF6',
            bgStart: '#0B1120',
            bgEnd: '#162038',
            iconPath: '<polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="none" stroke="#06B6D4" stroke-width="3"/><circle cx="50" cy="50" r="12" fill="#8B5CF6"/>',
            bannerDetail: '<g stroke="#06B6D4" stroke-width="2" fill="none"><polygon points="220,100 270,70 320,100 320,160 270,190 220,160"/><polygon points="320,100 370,70 420,100 420,160 370,190 320,160"/><polygon points="270,190 320,160 370,190 370,250 320,280 270,250"/><polygon points="170,190 220,160 270,190 270,250 220,280 170,250"/></g><circle cx="320" cy="160" r="16" fill="#8B5CF6"/><text x="320" y="166" font-family="monospace" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">NN</text>'
        },
        'notewave-ai': {
            name: 'NoteWave AI',
            monogram: 'NW',
            primary: '#FBBF24',
            secondary: '#A78BFA',
            bgStart: '#17102B',
            bgEnd: '#291C4A',
            iconPath: '<path d="M20 75 Q 35 60 50 75 Q 65 60 80 75 V 25 Q 65 10 50 25 Q 35 10 20 25 Z" fill="none" stroke="#FBBF24" stroke-width="3"/><line x1="50" y1="25" x2="50" y2="75" stroke="#A78BFA" stroke-width="2"/>',
            bannerDetail: '<path d="M160 230 Q 230 205 300 230 Q 370 205 440 230 V 90 Q 370 65 300 90 Q 230 65 160 90 Z" fill="#1C1433" stroke="#FBBF24" stroke-width="3"/><line x1="300" y1="90" x2="300" y2="230" stroke="#A78BFA" stroke-width="2.5"/><path d="M120 160 Q 200 130 300 160 T 480 160" fill="none" stroke="#FDE047" stroke-width="2" stroke-dasharray="4 4"/><circle cx="300" cy="140" r="22" fill="#291C4A" stroke="#FBBF24" stroke-width="2"/><text x="300" y="148" font-family="sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF" text-anchor="middle">NW</text>'
        },
        'pc-refinishing-cyber': {
            name: 'PC Refinishing Cyber',
            monogram: 'PC',
            primary: '#F59E0B',
            secondary: '#14B8A6',
            bgStart: '#0F1A24',
            bgEnd: '#1A2C3D',
            iconPath: '<rect x="25" y="25" width="50" height="50" rx="6" fill="#14B8A6" opacity="0.3" stroke="#F59E0B" stroke-width="3"/><circle cx="50" cy="50" r="12" fill="none" stroke="#FFFFFF" stroke-width="2"/><g stroke="#F59E0B" stroke-width="2"><line x1="35" y1="15" x2="35" y2="25"/><line x1="50" y1="15" x2="50" y2="25"/><line x1="65" y1="15" x2="65" y2="25"/><line x1="35" y1="75" x2="35" y2="85"/><line x1="50" y1="75" x2="50" y2="85"/><line x1="65" y1="75" x2="65" y2="85"/></g>',
            bannerDetail: '<rect x="210" y="80" width="180" height="180" rx="14" fill="#132332" stroke="#F59E0B" stroke-width="3"/><rect x="235" y="105" width="130" height="130" rx="8" fill="#1A2F42" stroke="#14B8A6" stroke-width="2"/><circle cx="300" cy="170" r="35" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="6 4"/><g stroke="#F59E0B" stroke-width="3"><line x1="240" y1="60" x2="240" y2="80"/><line x1="270" y1="60" x2="270" y2="80"/><line x1="300" y1="60" x2="300" y2="80"/><line x1="330" y1="60" x2="330" y2="80"/><line x1="360" y1="60" x2="360" y2="80"/><line x1="240" y1="260" x2="240" y2="280"/><line x1="270" y1="260" x2="270" y2="280"/><line x1="300" y1="260" x2="300" y2="280"/><line x1="330" y1="260" x2="330" y2="280"/><line x1="360" y1="260" x2="360" y2="280"/></g><text x="300" y="178" font-family="monospace" font-size="28" font-weight="bold" fill="#FFFFFF" text-anchor="middle">PC</text>'
        },
        'pc-refinishing-spa': {
            name: 'PC Refinishing Spa',
            monogram: 'PS',
            primary: '#FB7185',
            secondary: '#FDE047',
            bgStart: '#1E1218',
            bgEnd: '#331F2A',
            iconPath: '<circle cx="50" cy="50" r="34" fill="none" stroke="#FB7185" stroke-width="3"/><path d="M50 20 L58 42 L80 50 L58 58 L50 80 L42 58 L20 50 L42 42 Z" fill="#FDE047"/>',
            bannerDetail: '<circle cx="300" cy="170" r="100" fill="#261620" stroke="#FB7185" stroke-width="2.5"/><circle cx="300" cy="170" r="85" fill="none" stroke="#FDE047" stroke-width="1.5" stroke-dasharray="4 6"/><path d="M300 95 L315 145 L365 170 L315 195 L300 245 L285 195 L235 170 L285 145 Z" fill="#FDE047" opacity="0.85"/><text x="300" y="178" font-family="serif" font-size="24" font-weight="bold" fill="#1E1218" text-anchor="middle">PS</text>'
        },
        'sacco': {
            name: 'SACCO Micro-Finance',
            monogram: 'SC',
            primary: '#10B981',
            secondary: '#E6C280',
            bgStart: '#081D14',
            bgEnd: '#133324',
            iconPath: '<path d="M50 15 L80 30 V55 C80 72 50 85 50 85 C50 85 20 72 20 55 V30 Z" fill="none" stroke="#10B981" stroke-width="3"/><circle cx="50" cy="48" r="14" fill="#E6C280" opacity="0.9"/>',
            bannerDetail: '<path d="M300 60 L440 110 V190 C440 245 300 280 300 280 C300 280 160 245 160 190 V110 Z" fill="#0C251A" stroke="#10B981" stroke-width="3"/><circle cx="300" cy="165" r="50" fill="#123827" stroke="#E6C280" stroke-width="2"/><circle cx="300" cy="165" r="38" fill="none" stroke="#10B981" stroke-width="1.5" stroke-dasharray="4 4"/><text x="300" y="175" font-family="sans-serif" font-size="30" font-weight="bold" fill="#E6C280" text-anchor="middle">SC</text>'
        },
        'spectre': {
            name: 'SPECTRE Hypercar',
            monogram: 'SP',
            primary: '#E6C280',
            secondary: '#EF4444',
            bgStart: '#141414',
            bgEnd: '#29221D',
            iconPath: '<path d="M15 65 C25 45 40 42 50 42 C60 42 75 45 85 65 H15 Z" fill="none" stroke="#E6C280" stroke-width="3"/><line x1="20" y1="58" x2="80" y2="58" stroke="#EF4444" stroke-width="2.5"/><circle cx="28" cy="65" r="8" fill="#333" stroke="#E6C280" stroke-width="2"/><circle cx="72" cy="65" r="8" fill="#333" stroke="#E6C280" stroke-width="2"/>',
            bannerDetail: '<path d="M120 220 Q 220 120 300 120 T 480 220 Z" fill="#1C1814" stroke="#E6C280" stroke-width="3"/><line x1="160" y1="185" x2="440" y2="185" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/><circle cx="200" cy="225" r="24" fill="#0D0F12" stroke="#E6C280" stroke-width="3"/><circle cx="400" cy="225" r="24" fill="#0D0F12" stroke="#E6C280" stroke-width="3"/><text x="300" y="165" font-family="monospace" font-size="26" font-weight="bold" fill="#E6C280" text-anchor="middle">SPECTRE</text>'
        },
        'surth': {
            name: 'SUTRH Apparel Passport',
            monogram: 'ST',
            primary: '#F59E0B',
            secondary: '#D97706',
            bgStart: '#21150C',
            bgEnd: '#362214',
            iconPath: '<polygon points="50,15 80,30 80,70 50,85 20,70 20,30" fill="#D97706" opacity="0.3" stroke="#F59E0B" stroke-width="3"/><circle cx="50" cy="50" r="16" fill="none" stroke="#E6C280" stroke-width="2"/>',
            bannerDetail: '<polygon points="300,60 450,120 450,220 300,280 150,220 150,120" fill="#26180E" stroke="#F59E0B" stroke-width="3"/><circle cx="300" cy="170" r="60" fill="#1C120B" stroke="#E6C280" stroke-width="2"/><text x="300" y="179" font-family="serif" font-size="28" font-weight="bold" fill="#F5E6C8" text-anchor="middle">ST</text>'
        },
        'synthetix-saas': {
            name: 'Synthetix SaaS',
            monogram: 'SX',
            primary: '#38BDF8',
            secondary: '#E6C280',
            bgStart: '#0B1322',
            bgEnd: '#15243F',
            iconPath: '<rect x="18" y="25" width="28" height="22" rx="4" fill="none" stroke="#38BDF8" stroke-width="2.5"/><rect x="54" y="25" width="28" height="22" rx="4" fill="none" stroke="#E6C280" stroke-width="2.5"/><rect x="36" y="55" width="28" height="22" rx="4" fill="none" stroke="#38BDF8" stroke-width="2.5"/><path d="M32 47 V51 H50 M68 47 V51 H50 V55" stroke="#FFFFFF" stroke-width="2"/>',
            bannerDetail: '<g stroke="#38BDF8" stroke-width="2"><rect x="120" y="90" width="100" height="60" rx="8" fill="#111C30"/><rect x="250" y="90" width="100" height="60" rx="8" fill="#111C30"/><rect x="380" y="90" width="100" height="60" rx="8" fill="#111C30"/><rect x="180" y="190" width="110" height="60" rx="8" fill="#172640"/><rect x="310" y="190" width="110" height="60" rx="8" fill="#172640"/></g><path d="M220 120 H250 M350 120 H380 M170 150 V190 M430 150 V190" stroke="#E6C280" stroke-width="2.5"/><text x="300" y="128" font-family="monospace" font-size="18" font-weight="bold" fill="#E6C280" text-anchor="middle">SX</text>'
        },
        'synthetix-webapp': {
            name: 'Synthetix WebApp',
            monogram: 'SW',
            primary: '#64FFDA',
            secondary: '#F5E6C8',
            bgStart: '#0A1826',
            bgEnd: '#132B42',
            iconPath: '<circle cx="50" cy="50" r="32" fill="none" stroke="#64FFDA" stroke-width="3"/><line x1="50" y1="50" x2="68" y2="35" stroke="#F5E6C8" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="50" r="5" fill="#64FFDA"/>',
            bannerDetail: '<circle cx="300" cy="170" r="95" fill="#0E2133" stroke="#64FFDA" stroke-width="3"/><circle cx="300" cy="170" r="70" fill="none" stroke="#64FFDA" stroke-width="1.5" stroke-dasharray="4 6"/><line x1="300" y1="170" x2="355" y2="125" stroke="#F5E6C8" stroke-width="4" stroke-linecap="round"/><circle cx="300" cy="170" r="14" fill="#64FFDA"/><text x="300" y="225" font-family="monospace" font-size="20" font-weight="bold" fill="#64FFDA" text-anchor="middle">SW</text>'
        },
        'valence': {
            name: 'Valence Longevity Institute',
            monogram: 'VL',
            primary: '#34D399',
            secondary: '#E6C280',
            bgStart: '#07241F',
            bgEnd: '#103A32',
            iconPath: '<path d="M30 20 Q 50 50 70 20 M30 80 Q 50 50 70 80 M30 50 H70 M35 35 H65 M35 65 H65" fill="none" stroke="#34D399" stroke-width="3" stroke-linecap="round"/>',
            bannerDetail: '<g stroke="#34D399" stroke-width="3" fill="none"><path d="M180 120 Q 300 220 420 120"/><path d="M180 220 Q 300 120 420 220"/></g><g stroke="#E6C280" stroke-width="2"><line x1="220" y1="145" x2="220" y2="195"/><line x1="260" y1="165" x2="260" y2="175"/><line x1="300" y1="170" x2="300" y2="170"/><line x1="340" y1="165" x2="340" y2="175"/><line x1="380" y1="145" x2="380" y2="195"/></g><circle cx="300" cy="170" r="28" fill="#0C2E27" stroke="#34D399" stroke-width="2"/><text x="300" y="177" font-family="serif" font-size="18" font-weight="bold" fill="#F5E6C8" text-anchor="middle">VL</text>'
        },
        'xpera': {
            name: 'Xpera Intelligence Engine',
            monogram: 'XP',
            primary: '#C084FC',
            secondary: '#E6C280',
            bgStart: '#140D24',
            bgEnd: '#25173F',
            iconPath: '<polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="#140D24" stroke="#C084FC" stroke-width="3"/><polygon points="50,30 72,42 72,68 50,80 28,68 28,42" fill="none" stroke="#E6C280" stroke-width="2"/>',
            bannerDetail: '<polygon points="300,50 480,120 480,220 300,290 120,220 120,120" fill="#1B1230" stroke="#C084FC" stroke-width="3"/><polygon points="300,85 435,138 435,202 300,255 165,202 165,138" fill="none" stroke="#E6C280" stroke-width="2"/><circle cx="300" cy="170" r="35" fill="#120A20" stroke="#C084FC" stroke-width="2"/><text x="300" y="180" font-family="sans-serif" font-size="28" font-weight="extrabold" fill="#F5E6C8" text-anchor="middle">XP</text>'
        },
        'xpera-hebrew': {
            name: 'Xpera Hebrew Localized',
            monogram: 'XP',
            primary: '#E6C280',
            secondary: '#F5E6C8',
            bgStart: '#1A140D',
            bgEnd: '#2E2216',
            iconPath: '<polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="#1A140D" stroke="#E6C280" stroke-width="3"/><circle cx="50" cy="50" r="16" fill="none" stroke="#F5E6C8" stroke-width="2"/>',
            bannerDetail: '<polygon points="300,50 480,120 480,220 300,290 120,220 120,120" fill="#20170E" stroke="#E6C280" stroke-width="3"/><polygon points="300,85 435,138 435,202 300,255 165,202 165,138" fill="none" stroke="#FFF3CD" stroke-width="2"/><text x="300" y="180" font-family="serif" font-size="30" font-weight="bold" fill="#E6C280" text-anchor="middle">א · XP</text>'
        }
    };

    // Generic fallback for any unlisted project
    function getFallback(id) {
        return {
            name: id || 'Web System',
            monogram: (id || 'WS').substring(0, 2).toUpperCase(),
            primary: '#E6C280',
            secondary: '#FFF3CD',
            bgStart: '#12161A',
            bgEnd: '#1A232E',
            iconPath: '<polygon points="50,18 82,36 82,74 50,92 18,74 18,36" fill="none" stroke="#E6C280" stroke-width="3"/><circle cx="50" cy="55" r="14" fill="#FFF3CD" opacity="0.8"/>',
            bannerDetail: '<polygon points="300,60 460,130 460,210 300,280 140,210 140,130" fill="#151C24" stroke="#E6C280" stroke-width="2.5"/><circle cx="300" cy="170" r="40" fill="#0F141A" stroke="#FFF3CD" stroke-width="2"/><text x="300" y="180" font-family="monospace" font-size="28" font-weight="bold" fill="#E6C280" text-anchor="middle">SYS</text>'
        };
    }

    /**
     * Generates a 1:1 Favicon Logo SVG string
     */
    function getProjectLogoSvg(id) {
        const item = VECTORS[id] || getFallback(id);
        return `
            <svg class="project-vector-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.name} Favicon Logo">
                <defs>
                    <linearGradient id="grad-logo-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="${item.bgStart}" />
                        <stop offset="100%" stop-color="${item.bgEnd}" />
                    </linearGradient>
                    <filter id="glow-logo-${id}" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                <rect width="100" height="100" rx="20" fill="url(#grad-logo-${id})" stroke="${item.primary}" stroke-width="2.5"/>
                <g filter="url(#glow-logo-${id})">
                    ${item.iconPath}
                </g>
            </svg>
        `.trim();
    }

    /**
     * Generates a 16:9 Banner Vector Graphic SVG string
     */
    function getProjectBannerSvg(id) {
        const item = VECTORS[id] || getFallback(id);
        return `
            <svg class="project-vector-banner w-full h-full" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${item.name} Architectural Vector Showcase">
                <defs>
                    <linearGradient id="grad-banner-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="${item.bgStart}" />
                        <stop offset="100%" stop-color="${item.bgEnd}" />
                    </linearGradient>
                    <pattern id="pat-banner-${id}" width="30" height="30" patternUnits="userSpaceOnUse">
                        <circle cx="15" cy="15" r="1" fill="${item.primary}" opacity="0.25"/>
                    </pattern>
                </defs>
                <rect width="600" height="340" fill="url(#grad-banner-${id})"/>
                <rect width="600" height="340" fill="url(#pat-banner-${id})"/>
                ${item.bannerDetail}
                <rect x="20" y="20" width="110" height="26" rx="6" fill="#0D0F12" fill-opacity="0.85" stroke="${item.primary}" stroke-width="1"/>
                <circle cx="32" cy="33" r="3.5" fill="${item.primary}"/>
                <text x="44" y="37" font-family="monospace" font-size="10" font-weight="bold" fill="#F5E6C8">ARCH // SPEC</text>
            </svg>
        `.trim();
    }

    window.ProjectVectors = {
        getLogo: getProjectLogoSvg,
        getBanner: getProjectBannerSvg,
        meta: VECTORS
    };
})();
