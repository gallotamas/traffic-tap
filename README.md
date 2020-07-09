# Traffic tap
Traffic tap enables you to monitor live access logs of the Istio sidecar proxies.

## Getting started

- Follow the getting started guide to install [Backyards](https://banzaicloud.com/blog/try-backyards-how-to/).
 - Expose the Backyards ingress locally by running `backyards dashboard`.
 - ```sh
   # install dependencies
   npm i

   # start the application
   npm start
   ```
 - Open the application at http://127.0.0.1:3000/. NOTE: `npm start` opens the application at http://localhost:3000/ but since the auth cookie is not set there it will fail to communicate with the backend so make sure to use the first link.
 - Generate some traffic e.g. by using `backyards demoapp load` or inspect the traffic from `backyards-system`.

## Features
- Filtering accessLogs by namespaces, resource names and destination resources. Validate filters and clear incorrect combinations.
- Linkable filter configuration (filters are persisted in the URL as query params).
- Start/stop the accessLog stream.
- Show the accessLogs matching the selected resources.
- View the details of a specific accessLog entry.
- Automatic reconnect in case of network failures.

## Known issues

- **Network issues only detected once:** if the connection to the backend service fails an error message is shown for the first time but doesn’t for the second time. This is an issue with `@apollo/react-hooks` as it doesn’t update the error property for the second time. NOTE: this doesn't affect the automatic reconnect functionality as the app always tries to reconnect on network failures.

- **High network traffic makes the UI less responsive:** if there is too much traffic going on then the browser might have hard time to process all the accessLogs and render them on the screen. Tip: Consider using more granular filters.<br>
This issue could be solved by introducing a WebWorker and offloading the websocket communication to it. I would also have to introduce a global state layer for that (e.g. by using redux) and update the store in every 50-100 ms that would trigger the rerender of the data table.

## Testing
Due to time limitations testing is missing.
