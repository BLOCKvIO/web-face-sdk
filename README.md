# BLOCKv Web Face SDK

This is the official BLOCKv Web Face SDK. It allows you to easily build Web Faces which communicate with compatible Vatom Viewers.

## Installation

Install from npm

```console
npm install @blockv/web-face-sdk
```

Import (ES6 & ES7)

```console
import Blockv from '@blockv/web-face-sdk'
```

Import via script tag

``` html
<script src='https://unpkg.com/@blockv/web-face-sdk/dist/web-face-sdk.min.js'></script>
```

## Interacting with the SDK

The Web Face SDK provides a simple interface into the underlying Vatom Viewer.

### Getting Started

If you would like to access the backing Vatom or interact with the BLOCKv platform in any way, you should start by initializing the SDK.
>Trying to access any other features of the SDK prior to initialization will cause an error to be thrown.

```js
    Blockv.init()
      .then((data) => {
        // the SDK is ready to use
        return data;
      })
      .catch((error) => {
        // this web code is not being displayed by a BLOCKv viewer
      });
```

By initializing the SDK you allow it to establish a connection with the underlying viewer and gain context of the backing Vatom.

#### Backing Vatom

Object containing the data for the backing Vatom. The backing Vatom is the Vatom to which this face belongs, typically, it is Vatom currently being displayed by the viewer.
>Trying to access this prior to initializing the SDK will cause an error to be thrown.

```js
    Blockv.backingVatom;
```

#### Backing Face

This is the data for the selected face being used to display this Vatom.
>Trying to access this prior to initializing the SDK will cause an error to be thrown.

```js
    Blockv.backingFace;
```

#### Backing Vatom Updates

Respond to updates to the backing Vatom, e.g. state updates, by adding an event listener.

```js
    Blockv.backingVatom.addEventListener('update', (vatom) => {
        // Vatom is the updated backing vatom
    });
```

#### Fetching a Vatom

Fetch a permitted Vatom by providing its `id`.

Restriction: Only the backing Vatom of one of its immediate children may be queried.
> Providing an id that is not the backing Vatom or one its immediate children will throw an error.

```js
    Blockv.vatomManager
      .getVatom(Blockv.backingVatom.id)
      .then((vatom) => {
        // success
      });
```

#### Fetching a Vatom's Children

Fetch the children of the backing Vatom by providing its `id`.

Restriction: Only the backing Vatom may be queried.
>Providing an id that is not the backing Vatom will throw an error.

```js
    Blockv
      .vatomManager
      .getChildren(Blockv.backingVatom.id)
      .then((children) => {
        // children is an array of vatoms
      });
```

#### Performing an Action

Perform an action on a the backing Vatom by providing an action payload.

Restriction: Only permitted on the backing Vatom.
> Providing an id that is not the backing Vatom throw an error.

```js
    Blockv.vatomManager
      .performAction('<action-name>', {
          'this.id': Blockv.backingVatom.id, // this.id must match the backing vatom's id
          // ... other properties required for the action.
        })
      .then((response) => {
        // success
      });
```

#### Fetching a User's Public Profile

Fetch the public profile of any user by providing their `id`.

```js
    Blockv.userManager
      .getPublicUser(Blockv.backingVatom.properties.owner)
      .then((user) => {
        // success
      })
```

#### Fetching the Current User's Public Profile

Fetch the public profile of the current user with additional information regarding their tokens.

```js
    Blockv.vatomManager
      .setParentId(<vatom-id>, <new-parent-id>)
      .then((user) => {
        // success
      })
```

#### Updating the Parent ID of a Child Vatom

Allows the Web Face to set the parent ID of the one of the backing vAtoms children. This essentially gives the Web Face the ability to "Split" a child vAtom from the parent's folder.

```js
    let parentID = null;
    let firstID = null;
    return Promise.resolve().then(() => {
      parentID = Blockv.backingVatom.properties.propertyData.parent_id;
      // find all children
      return Blockv.vatomManager.getChildren(Blockv.backingVatom.id);
    }).then((children) => {
      // sanity check
      if (children.length === 0) throw new Error('No child vatom found');
      // grab first id
      firstID = children[0].id;
      // set parent ID
      return Blockv.vatomManager.setParentId(firstID, parentID);
    }).then(() => {
      // parent id update on the child has been requested
    })
```

#### Observing Updates to the Backing Vatom's Children

Allows the Web face to observe changes to the backing Vatom's children.

```js
// add a listener on for child updates
Blockv.init()
    .then((data) => {
        Blockv.backingVatom.addEventListener('children', this.onBackingVatomChildrenUpdate.bind(this));
      }
```

```js
// function to call
onBackingVatomChildrenUpdate(data) {
    // handle changes to the 'vatoms' array containing the backing vatom's children
  }

```

#### Displaying Vatom Resources

Displaying Vatom resources requires each URL to be encoded with BLOCKv access credentials.

```js
    Blockv.resourceManager
      .encodeResources(Blockv
        .backingVatom
        .properties
        .resources.map(res => res.value.value))
      .then((resources) => {
        // resources is an ordered array of encoded urls
      })
```

### Custom Messages

You are able to send any custom messages to the viewer as follows (note, the message name must be prefixed with `viewer.`).
> Sending a message with a name not prefixed by `viewer.` will throw an error.

```js
    Blockv.sendMessage('viewer.<custom-message>', {/* ... custom data*/})
      .then((data) => {
        // success
      });
```

You are also able to receive custom messages sent by the viewer.

```js
    Blockv.addRequestHandler('viewer.<custom-message>', data => {
      // ...
    });
```

#### Supported Custom Messages

All BLOCKv Vatoms apps support the following face messages:

| Method                | Description                                                                          |
|-----------------------|--------------------------------------------------------------------------------------|
| `viewer.vatom.show`   | Request the viewer to engage the specified Vatom.                                    |
| `viewer.map.show`     | Request the viewer to shows its map UI.                                              |
| `viewer.qr.scan`      | Request the viewer to show a QR scanner and passes back the response to the web app. |
| `viewer.view.close`   | Request the viewer to close the current Vatom.                                       |
| `viewer.scanner.show` | Request the viewer to open a scanner and to interpret the scan result itself.        |
| `viewer.card.show`    | Request the viewer to show the card view mode.                                       |
| `viewer.url.open`     | Request the viewer to open the URL.                                                  |
| `viewer.scanner.show` | Request the viewer to open the image recognition scanner.                            |
| `viewer.action.send`  | Request the viewer to prompt the user to send the vatom to another user.             |
| `viewer.action.share` | Request the viewer to prompt the user to share the vatom to another user.            |

## Author

[BLOCKv](developer.blockv.io)

## License

BLOCKv is available under the BLOCKv AG license. See the [LICENSE](./LICENSE.md) file for more info.
