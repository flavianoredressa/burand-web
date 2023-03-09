## Descrição

A classe `AppError` é utilizada para criar instâncias de erros personalizados na aplicação.

- `message` (somente leitura): mensagem de erro.
- `title` (somente leitura): título do erro.

Se o parâmetro de código passado para o construtor não for encontrado no objeto [apiErrosTranslate](api-erros-translate.md), uma mensagem de erro padrão será usada.

## Uso

Para criar um novo erro personalizado, basta instanciar a classe `AppError`, passando um título e uma mensagem como parâmetros:

```typescript
import { AppError } from '@burand/web/exceptions';

const error = new AppError('Erro ao carregar dados', 'Não foi possível carregar os dados. Tente novamente mais tarde.');
console.log(error.title);
console.log(error.message);
```

---

```typescript
import { AppError } from '@burand/web/exceptions';

try {
  if (/* ..algo.. */) {
    throw new AppError(
      'Erro ao realizar operação',
      'Não foi possível realizar a operação. Tente novamente mais tarde.'
    );
  }
} catch (error) {
  if (error instanceof ApiError) {
    toast({
      status: 'error',
      title: error.title,
      description: error.message
    });
  }
}
```
