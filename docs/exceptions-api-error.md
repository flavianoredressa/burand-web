## Descrição

Exporta uma classe `ApiError` que representa um erro retornado por uma API. A classe tem três atributos: message, code e statusCode.

- O atributo `message` é uma mensagem de erro legível por humanos que descreve o erro. Ele é obtido do objeto [apiErrosTranslate](api-erros-translate.md) que contém pares chave-valor de códigos de erro e mensagens.

- O atributo `code` é uma string que representa o código de erro retornado pela API.

- O atributo `statusCode` é um número que representa o código de status HTTP retornado pela API.

Se o parâmetro de código passado para o construtor não for encontrado no objeto [apiErrosTranslate](api-erros-translate.md), uma mensagem de erro padrão será usada.

## Uso

Para usar essa classe, importe-a para seu arquivo e crie uma nova instância dela com o código de erro e o código de status HTTP retornados pela API. Por exemplo:

```typescript
import { ApiError } from '@burand/web/exceptions';

const errorCode = 'auth/wrong-password';
const httpStatusCode = 401;

const apiError = new ApiError(errorCode, httpStatusCode);
console.log(apiError.message); // "O e-mail ou senha está inválido."
console.log(apiError.code); // "auth/wrong-password"
console.log(apiError.statusCode); // 401
```

Este é um interceptor HTTP do Angular responsável por capturar erros de chamadas à API e transformá-los em objetos `ApiError` personalizados.

```typescript
// core/interceptors/api-error.interceptor.ts

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiError } from '@burand/web/exceptions';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (!request.url.startsWith(environment.urlApi)) {
          throw err;
        }

        if (err instanceof HttpErrorResponse && err.error.code && err.error.message) {
          throw new ApiError(err.error.code, err.status);
        }

        throw err;
      })
    );
  }
}
```

Você também pode verificar o objeto `ApiError` em um bloco try-catch para exibir a mensagem de erro ao usuário.

```typescript
import { ApiError } from '@burand/web/exceptions';

try {
  // Make API request
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.message); // Display error message to user
  } else {
    console.log('An unknown error occurred.'); // Handle other errors
  }
}
```
