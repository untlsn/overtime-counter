# Directory description

This directory contains a subdirectories that contain (something like) micro-projects

If you add new features to project (e.g. registration) put all components, helpers and stores ect assign to that feature in [features/registration](/src/features/registration)

If you want to reuse ones in another feature (e.g. you want to use date selector in another form) move its code to src and inside old file create a link for backward compatibility

If something is used ones but visible everywhere (e.g. Header) put in inside [features/root](/src/features/root)

## Example of moving code

### Old
`/features/example/components/SimpleButton.tsx`
```typescript jsx
  export default function SimpleButton() {
    return (
      <button>Very universal!</button>
    ) 
  }
```
  
### New
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
