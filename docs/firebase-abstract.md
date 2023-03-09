## FirebaseAbstract

A classe `FirebaseAbstract` é uma classe abstrata que fornece uma interface para realizar operações CRUD em coleções do Firebase Firestore.

## Construtor

O construtor da classe `FirebaseAbstract` requer uma instância do Firestore e o nome da coleção com a qual se deseja trabalhar.

```typescript
public constructor(firestore: Firestore, collectionName: string)
```

## Uso

Para usar este repositório, crie uma nova classe que estenda a classe `FirebaseAbstract` e defina o nome da coleção como um parâmetro do construtor:

```typescript
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAbstract } from '@burand/web/firestore';
import { FirestoreCollecionName } from '@config/firestore-collection-name';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UserRepository extends FirebaseAbstract<User> {
  constructor(protected firestore: Firestore) {
    super(firestore, FirestoreCollecionName.USERS);
  }
}
```

Agora você pode usar os métodos básicos da classe `FirebaseAbstract` para gerenciar documentos na coleção users.

## Métodos disponíveis

Os seguintes métodos estão disponíveis na classe FirebaseAbstract:

- `add(data: AddDocument<T>, options?: IOptions): Promise<string>`: Adiciona um novo documento à coleção.
- `update(data: UpdateDocument<T>, options?: IOptions): Promise<void>`: Atualiza um documento existente na coleção.
- `set(data: SetDocument<T>, options?: SetOptions & IOptions): Promise<void>`: Substitui um documento existente na coleção ou cria um novo documento.
- `delete(id: string): Promise<void>`: Remove um documento da coleção.
- `getById(id: string, options?: IOptions): Promise<T>`: Busca um documento pelo seu ID.
- `getAsyncById(id: string, options?: IOptions): Observable<T | null>`: Busca um documento pelo seu ID e retorna um Observable mantendo o documento atualizado em tempo real.
- `getByIds(ids: string[], options?: IOptions): Promise<T[]>`: Busca vários documentos pelos seus IDs.
- `getAll(options?: IOptions): Promise<T[]>`: Busca todos os documentos na coleção.

## Exceções

As seguintes exceções podem ser lançadas por esta classe:

- **[DocumentNotFoundError](exceptions-document-not-found-error.md)**: Lançada quando um documento não é encontrado na coleção.
