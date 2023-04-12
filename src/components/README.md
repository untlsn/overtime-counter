# Directory description

## Eng

This directory if for component that will be reused in 2 or more features

Components reused inside one feature put in the correct features directory.

E.g. Img with better metadata, clever inputs or headless components 

**DON'T** make component reusable by default! Better create two small not reusable components than one heavier reusable component.
Reuse component only if you need or if little change cover use requirement (e.g. adding optional prop). 
Override create new or split existing component ang grab a small piece.
Don't look too far ahead. Our predictions are usually wrong! Concentrate on current requirement.
