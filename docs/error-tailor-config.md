## Descrição

Este objeto contém pares chave-valor onde as chaves são códigos de erro retornados pelo ErrorTailor e os valores são mensagens de erro legíveis que descrevem o erro.

## Uso

```typescript
import { NgModule } from '@angular/core';
import { errorTailorConfig } from '@burand/web/resources';
import { ErrorTailorModule } from '@ngneat/error-tailor';

@NgModule({
  ...
  imports: [
    ...,
    ErrorTailorModule.forRoot(errorTailorConfig),
    ...
  ],
  ...
})
export class AppModule {}
```
