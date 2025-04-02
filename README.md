# Queue Refresher Extension

The Queue Refresher Extension is a Chrome extension designed to automate the process of refreshing queues on a given web page. This extension provides a utility bar button that can start and stop an automatic queue refresher with a configurable interval.

## Features
- Injects a utility bar button with an inline SVG icon.
- Provides a toggle function to start and stop the queue refresher.
- Allows users to specify the refresh interval in seconds.
- Automatically refreshes queues by clicking the refresh buttons on the page.

## Installation

1. Clone or download this repository.
   ```bash
   git clone https://github.com/your-username/queue-refresher-extension.git
   ```
2. Open the Chrome browser and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click the "Load unpacked" button.
5. Select the directory where you cloned/downloaded the repository.

## Usage

1. Once the extension is loaded, navigate to the web page with the queues you wish to refresh.
2. Look for the utility bar button added by the extension.
3. Click the button to start the queue refresher. You will be prompted to enter the refresh interval in seconds.
4. To stop the queue refresher, click the button again.

## Development

### Prerequisites
- Node.js and npm (for development)
- Chrome browser

### Project Structure
- `background.js`: Background script for managing the extension lifecycle.
- `content.js`: Content script that injects the utility bar button and handles queue refreshing.
- `manifest.json`: Configuration file for the Chrome extension.
- `icon.png`: Icon image used in the extension.
- `src/icon.png`: Local icon image used for the utility bar button.

## Contributing

We welcome contributions to improve the project! Here’s how you can get started:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -am 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Authors

- **@thisisshivamgupta** - Initial work

## Acknowledgments

Thanks to the open-source community for providing the tools and frameworks that made this project possible.

## Resources

- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
- [MutationObserver Documentation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
