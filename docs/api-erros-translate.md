## Descrição

Este objeto contém pares chave-valor onde as chaves são códigos de erro retornados pelo Firebase e os valores são mensagens de erro legíveis que descrevem o erro.

## Uso

Para usar este objeto, importe-o para seu arquivo e acesse a mensagem de erro por sua chave. Por exemplo:

```typescript
import { apiErrosTranslate } from '@burand/web/resources';

const errorCode = 'auth/wrong-password';
const errorMessage = apiErrosTranslate[errorCode];
console.log(errorMessage); // "O e-mail ou senha está inválido."
```

ou

```typescript
import { apiErrosTranslate } from '@burand/web/resources';

try {
  await signInWithEmailAndPassword(email, password);
} catch (err: any) {
  toast({
    description: apiErrosTranslate[err.code] || 'Ocorreu um erro na criação do seu cadastro, tente novamente.',
    status: 'error',
    title: 'Erro ao criar cadastro'
  });
}
```
