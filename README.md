# BLOCKv Web Face SDK
========================

This is the official BLOCKv Web Face SDK. It allows you to easily build a Web Face which is able to communicate with the BLOCKv platform.

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

#### Getting Started

If you would like to access the backing vAtom or interact with the BLOCKv platform in any way, you should start by initialising the SDK.
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

Object containing the data for the backing vAtom. The backing vAtom is the vAtom to which this face belongs, typically, it is vAtom currently being displayed by the viewer.
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

#### Backing vAtom Updates

Respond to updates to the backing vAtom, e.g. state updates, by adding an event listener.

```
    Blockv.onBackingVatomUpdate((vatom) => {
        // vatom is the updated backing vAtom
      });
```

#### Fetching a vAtom

Fetch a permitted vAtom by providing its `id`.

Restriction: Only the backing vAtom of one of its immediate children may be queried.
>Providing an id that is not the backing vAtom or one it's children will cause an error to be thrown.

```
    Blockv.vatomManager
      .getVatom(Blockv.backingVatom.id)
      .then((vatom) => {
        // success
      });
```

#### Fetching a vAtom's children

You are able to fetch the children of a vAtom by providing it's id. Currently this is restricted to only the backing vAtom.
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
      .performAction('<action-name>', {
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

Before you are able to display any of the vAtom's resources you are required to encode their urls with access credentials.

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

#### Custom Messages

You are able to send custom messages to the viewer, the message name requires to be prefixed with `viewer.`.
>Sending a message with a name not prefixed by `viewer.` will cause an error to be thrown.

```
    Blockv.sendMessage('viewer.<custom-message>', {/* ... custom data*/})
      .then((data) => {
        // success
      });
```
##### Supported Custom Messages

All BLOCKv vAtoms apps support the following face messages:

 | Method                | Description                                                                                            |
 |-----------------------|--------------------------------------------------------------------------------------------------------|
 | `viewer.vatom.show`   | Request the viewer to engage the specified vAtom.                                                      |
 | `viewer.map.show`     | Request the viewer to shows its map UI.                                                                |
 | `viewer.qr.scan`      | Request the viewer to show a QR scanner and passes back the response to the web app.                   |
 | `viewer.view.close`   | Request the viewer to close the current vAtom.                                                         |
 | `viewer.url.open`     | Request the viewer to open the URL in a browser.                                                       |
 | `viewer.scanner.show` | Request the viewer to open a scanner and to interpret the scan result itself.                          |
 | `viewer.card.show`    | Request the viewer to show the card view mode.                                                         |
 | `viewer.action.send`  | Request the viewer to open the send screen.                                                            |
 | `viewer.action.share` | Request the viewer to open the share screen.                                                           |

## Author

[BLOCKv](developer.blockv.io)

## License

BLOCKv is available under the BLOCKv AG license. See the [LICENSE](./LICENSE.md) file for more info.
