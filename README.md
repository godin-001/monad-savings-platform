# Monad Savings Platform 💎

> **"En un seguro comercial confías en una empresa. Aquí confías en el código — y el código no miente."**

Ahorro a plazo fijo con rendimiento transparente en Monad. Para la generación de 20–35 años que no confía en las instituciones financieras.

**Monad Hackathon 2026.**

---

## El problema

Los seguros de ahorro comerciales fallan a los jóvenes de 3 maneras:
1. **Opacos** — comisiones ocultas del 15–40%
2. **Inflexibles** — compromisos de 5–20 años con penalizaciones
3. **Dependientes** — confías en que la institución no cambie los términos

## La solución

Un vault DeFi donde las reglas son inmutables, públicas y autoejecutables.
Sin KYC. Sin historial crediticio. Sin intermediarios. Solo el código.

---

## Características

- **APY fijo:** 5% (30d) / 12% (60d) / 20% (90d) — grabado en el contrato
- **Comisión transparente:** 10% del yield, visible antes de depositar
- **Metas de ahorro on-chain:** Define para qué ahorras (ej. "Viaje a Japón: 1,200 USDC")
- **Savings Streaks:** Tu disciplina de ahorro queda registrada en la blockchain
- **Sin KYC:** Solo necesitas una wallet

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Contratos | Solidity 0.8.24, Foundry |
| Red | Monad Testnet (Chain ID: 10143) |
| Frontend | Next.js 14, wagmi v2, RainbowKit |
| Estilos | Tailwind CSS (dark theme) |

---

## Estructura

```
monad-savings-platform/
├── contracts/
│   ├── src/
│   │   ├── SavingsVault.sol    # Vault principal con metas + streaks + fee
│   │   └── MockERC20.sol       # Token de prueba
│   ├── test/
│   │   └── SavingsVault.t.sol  # Tests Foundry (17 tests)
│   └── script/
│       └── Deploy.s.sol        # Deploy a Monad Testnet
├── frontend/
│   ├── app/
│   │   ├── page.tsx            # Landing con comparativa vs seguro comercial
│   │   └── app/page.tsx        # Dashboard: depósito, metas, posiciones
│   └── components/
│       ├── DepositForm.tsx     # Formulario con preview de yield neto
│       ├── PositionsTable.tsx  # Tabla de posiciones con claim
│       ├── GoalsSection.tsx    # Metas de ahorro on-chain
│       └── StatsRow.tsx        # Estadísticas del usuario
├── STRATEGY.md                 # Estrategia, diferenciadores, modelo de negocios
└── scripts/deploy.sh           # Deploy en un comando
```

---

## Quick Start

### Contratos

```bash
cd contracts

# Instalar dependencias
forge install foundry-rs/forge-std --no-commit

# Build + Tests
forge build
forge test -v

# Deploy a Monad Testnet
export PRIVATE_KEY=0x...
bash ../scripts/deploy.sh
```

### Frontend

```bash
cd frontend
npm install

# Actualizar direcciones en lib/contracts.ts
# NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID en .env.local

npm run dev
```

---

## Modelo de negocios

1. **Fee de rendimiento (día 1):** 10% del yield al claim. Visible en el contrato.
2. **Spread del yield pool (fase 2):** Fondos desplegados en lending → diferencia = margen.
3. **Premium Features (fase 3):** NFT Streaks, plazos extendidos, API empresarial.

---

## Monad Testnet

- **Chain ID:** 10143
- **RPC:** https://testnet-rpc.monad.xyz
- **Explorer:** https://testnet.monadexplorer.com
- **Faucet:** https://faucet.monad.xyz
