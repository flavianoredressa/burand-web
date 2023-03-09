# @burand/web

Este é um repositório abstrato para uso com Angular. Ele contém métodos básicos para manipular uma coleção do Firebase, e métodos comuns para uso.

## Instalação

Para usar este projeto, instale primeiro suas dependências:

```bash
npm install https://github.com/flavianoredressa/burand-web @angular/fire uuid
```

e as dependências de desenvolvimento

```bash
npm install -D @types/uuid
```

## Recursos

- **Exceções**

  - [ApiError](docs/exceptions-api-error.md)
  - [AppError](docs/exceptions-app-error.md)
  - [DocumentNotFoundError](docs/exceptions-document-not-found-error.md)

- **[FirebaseAbstract](docs/firebase-abstract.md)** - Fornece uma interface para realizar operações CRUD em coleções do Firebase Firestore.

  - ofFirestore: Converter dados do Firestore em um objeto do tipo T
  - toFirestore: Converter um objeto de modelo personalizado do tipo T em um objeto JavaScript simples
  - toNativeTypes: Converter tipos Firestore em tipos JavaScript

- **[apiErrosTranslate](docs/api-erros-translate.md)** - Este objeto é útil para traduzir os códigos de erro da API em mensagens amigáveis que podem ser xibidas para o usuário.

- **[errorTailorConfig](docs/error-tailor-config.md)** - Este objeto é útil para traduzir os códigos de erro do ErrorTailor em mensagens amigáveis que podem ser exibidas para o usuário.

- **Utils**
  ```typescript
  import {
    base64ToFile,
    JsonStorage,
    lastNameAbbeviated,
    noAccents,
    onlyDigits,
    readFileAsDataURL
  } from '@burand/web/utils';
  ```
