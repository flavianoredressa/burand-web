## Descrição

Ela é usada para sinalizar que um documento com o ID fornecido não foi encontrado no Firebase Firestore.

## Uso

```typescript
import { DocumentNotFoundError } from '@burand/web/exceptions';

try {
  await this._user.getById('abc123');
} catch (error) {
  if (error instanceof DocumentNotFoundError) {
    console.error(error.message); // "Document 'abc123' was not found."
  } else {
    console.error(error);
  }
}
```
