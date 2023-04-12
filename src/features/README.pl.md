# Opis katalogu

Ten katalog przechoruje subkatalogi zawierające coś na wzór mikro projektów

Jeżeli chcesz dodać nową funkcjonalność do projektu (np. rejestracje) to dodawaj wszystkie komponenty, helpery i story tutaj do [features/registration](/src/features/registration)

Jeżeli chcesz użyć jakiegoś kodu w innym miejscu (np. dany select daty sprzyda się w innym formularzu) to przenieś jego kod do /src, a stary kod podmień na link dla wstecznej kompatybliności

Jeżeli coś jest uzyte tylko raz, ale ma wpływ na cały kod (np. Nagłówek) to daj go do [features/root](/src/features/root)


## Przykłąd przenoszenia kodu

### Stare
`/features/example/components/SimpleButton.tsx`
```typescript jsx
  export default function SimpleButton() {
    return (
      <button>Very universal!</button>
    ) 
  }
```
  
### Nowe
`/features/example/components/SimpleButton.tsx`
```typescript jsx
// Component moved
export { default } from '~/components/SimpleButton'
```
`/src/components/SimpleButton.tsx`
```typescript jsx
export default function SimpleButton() {
    return (
      <button>Very universal!</button>
    ) 
}
```
