# Floripa em Dobro

Aplicativo mobile de cupons e benefícios para estabelecimentos de Florianópolis, desenvolvido com React Native + Expo.

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- **iOS** (apenas macOS): Xcode 15+ e CocoaPods instalado
- **Android**: Android Studio com SDK configurado

## Instalação

```bash
npm install
```

### Prebuild (obrigatório — módulos nativos)

Este projeto usa módulos nativos (`react-native-mmkv`, `react-native-svg`, `react-native-reanimated`) que **não funcionam no Expo Go**. É obrigatório gerar os projetos nativos antes de compilar:

```bash
npx expo prebuild --clean
```

> Execute novamente sempre que adicionar ou atualizar dependências com código nativo.

### iOS (apenas macOS)

```bash
cd ios && pod install && cd ..
```

### Android

```bash
cd android && ./gradlew clean && cd ..
```

## Como iniciar

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o Metro bundler (Expo Go) |
| `npm run ios` | Compila e abre no simulador iOS |
| `npm run android` | Compila e abre no emulador Android |
| `npm run web` | Abre no navegador |
| `npm test` | Executa a suite de testes |
| `npm run test:watch` | Testes em modo watch |
| `npm run lint` | Verifica lint e formatação |
| `npm run format` | Corrige lint e formatação automaticamente |

## Tecnologias

### Core

| Tech | Versão | Uso |
|---|---|---|
| [React Native](https://reactnative.dev) | 0.81.5 | Framework base |
| [Expo](https://expo.dev) | 54 | Toolchain, build e APIs nativas |
| [TypeScript](https://www.typescriptlang.org) | 5.9 | Tipagem estática |
| [React](https://react.dev) | 19.1 | UI |

### Navegação

| Tech | Uso |
|---|---|
| [@react-navigation/native](https://reactnavigation.org) | Navegação base |
| [@react-navigation/bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator) | Tab bar inferior |
| [@react-navigation/stack](https://reactnavigation.org/docs/stack-navigator) | Stack de telas (cupons) |

### UI & Estilo

| Tech | Uso |
|---|---|
| [styled-components](https://styled-components.com/docs/basics#react-native) | Estilização com tema tipado |
| [react-native-svg](https://github.com/software-mansion/react-native-svg) | Renderização de ícones SVG |
| [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer) | Importação de `.svg` como componente React |
| [@expo/vector-icons](https://docs.expo.dev/guides/icons/) | Ícones Ionicons |
| [@expo-google-fonts/inter](https://github.com/expo/google-fonts) | Fonte Inter |
| [@expo-google-fonts/poppins](https://github.com/expo/google-fonts) | Fonte Poppins |
| [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) | Safe area (notch, home bar) |
| [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) | Gestos nativos |
| [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) | Animações de alta performance |

### Estado & Persistência

| Tech | Uso |
|---|---|
| [Zustand](https://github.com/pmndrs/zustand) | Gerenciamento de estado global |
| [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) | Persistência local de alta performance |

### Testes

| Tech | Uso |
|---|---|
| [Jest](https://jestjs.io) | Runner de testes |
| [jest-expo](https://github.com/expo/expo/tree/main/packages/jest-expo) | Preset Jest para Expo |
| [@testing-library/react-native](https://callstack.github.io/react-native-testing-library/) | Utilitários de teste de componentes |

## Estrutura do projeto

```
floripa-em-dobro/
├── src/
│   ├── assets/
│   │   ├── icons/          # Ícones SVG (categorias, navegação)
│   │   └── png/            # Imagens raster (banners, cards)
│   ├── features/
│   │   └── coupons/        # Feature de cupons (estrutura vertical)
│   │       ├── __tests__/
│   │       ├── components/ # CouponCard, CategoryFilter, SearchBar
│   │       ├── data/       # Mock data
│   │       ├── screens/    # CouponListScreen, CouponFormScreen
│   │       ├── store/      # Zustand store + MMKV persistence
│   │       ├── types/      # Tipos e categorias
│   │       └── utils/      # Filtros e utilitários
│   ├── navigation/
│   │   ├── TabNavigator    # Tab bar principal
│   │   ├── CouponsStack    # Stack navigator de cupons
│   │   └── types.ts        # Tipos de rotas
│   └── shared/
│       ├── components/     # Componentes reutilizáveis
│       └── theme/          # Design system (cores, tipografia, espaçamento)
├── App.tsx                 # Entry point (Expo)
└── app.json                # Configuração Expo
```

## Design System

O tema global fica em `src/shared/theme/index.ts` e é injetado via `ThemeProvider` do styled-components. Todas as cores, tipografia, espaçamento e border radius são consumidos via `theme` nos componentes estilizados.

Paleta principal:
- **Background:** `#0F1112`
- **Card:** `#2C2622`
- **Primary (laranja):** `#EF921E`
- **Accent (amarelo):** `#FFBD32`
- **Bonus (roxo):** `#8A23CE`
