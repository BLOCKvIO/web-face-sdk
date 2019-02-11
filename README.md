# BLOCKv Web Face SDK
========================

This is the official BLOCKv Web Face SDK. It allows the creation of a Web Face by enabling a web app to communicate with the BLOCKv platform via the displaying viewer.

## Installation

Install from npm
```
npm install @blockv/web-face-sdk
```

Import( ES6 & ES7)
```
import Blockv from '@blockv/web-face-sdk'
```

## Examples

#### Getting started

Before being able to communicate with the viewer you are required to initialize the SDK.
>Trying to access any other features of the SDK prior to initialisation will cause an error to be thrown.

```
    Blockv.init()
      .then((data) => {
        // The SDK is ready to use.
        return data;
      })
      .catch((error) => {
        // This web code is not being displayed by a BLOCKv viewer.
      });
```

#### Backing vAtom

This is the data for the displayed vAtom.
>Trying to access this prior to initialising the SDK will cause an error to be thrown.

```
    Blockv.backingVatom;
```

#### Backing Face

This is the data for the selected face being used to display this vAtom.
>Trying to access this prior to initialising the SDK will cause an error to be thrown.

```
    Blockv.backingFace;
```

#### Backing vAtom updates

You are able to listen to updates to the backing vAtom.

```
    Blockv.onBackingVatomUpdate((vatom) => {
        // vatom is the updated backing vAtom
      });
```

#### Fetching a vAtom

You are able to fatch a vAtom by providing it's id. Currently this is restricted to the backing vAtom or one of it's children.
>Providing an id that is not the backing vAtom or one it's children will cause an error to be thrown.

```
    Blockv.vatomManager
      .getVatom(Blockv.backingVatom.id)
      .then((vatom) => {
        // success
      });
```

#### Fetching a vAtom's children

You are able to fetch the children a vAtom by providing it's id. Currently this is restricted to only the backing vAtom.
>Providing an id that is not the backing vAtom will cause an error to be thrown.

```
    Blockv
      .vatomManager
      .getChildren(Blockv.backingVatom.id)
      .then((children) => {
        // children is an array of vAtoms
      });
```

#### Performing an action

You are able to perform an action on a vAtom. Currently this is restricted to the backing vAtom.
>Providing an id that is not the backing vAtom will cause an error to be thrown.

```
    Blockv.vatomManager
      .performAction(/* <action-name> */, {
          'this.id': Blockv.backingVatom.id, // this.id must match the backing vAtom's id
          // ... other properties required for the action.
        })
      .then((response) => {
        // success
      });
```

#### Fetching a public user profile

You are able to fetch the public profile of a user by providing their id.

```
    Blockv.userManager
      .getPublicUser(Blockv.backingVatom.properties.owner)
      .then((user) => {
        // success
      })
```

#### Displaying vAtom resources

Before you are able to display any of the vAtom's resources you require to encode their urls with access credentials.

```
    Blockv.resourceManager
      .encodeResources(Blockv
        .backingVatom
        .properties
        .resources.map(res => res.value.value))
      .then((resources) => {
        // resources is an ordered array of encoded urls
      })
```


## Author

[BLOCKv](developer.blockv.io)

## License

BLOCKv is available under the BLOCKv AG license. See the [LICENSE](./LICENSE.md) file for more info.
