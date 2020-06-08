# Quaranteam
Frame composer for Quaranteam.

## How to Update the Frames

You'll need a computer with `git`, `node`, and `yarn` installed. The procedure consists in forking this repository, editing a configuration file which defines the available frames, adding the frame images, and finally sending a pull request to merge the changes. Once the pull request is accepted the new frames are automatically updated on the website.

### Editing the Configuration File

Modify the file at `./frames-web/src/assets/frames.json` using a text editor. The high-level structure of the file is as follows:

```
{
  "[2-letter language code]": {
    "code": "[2-letter language code]",
    "label": "[name of the language]",
    "frames": [
      {
        "type": "[unique string identifying the frame type]",
        "fbId": "[frame id on Facebook]"
      },
      // ...more frames for this language
    ]
   },
   // ...more languages
}

```

Feel free to add languages and frames. The frame `type` can be any lowercase alphanumeric string and dashes (`-`), it is arbitrary and just needed to reference the correct image files. Ideally it would represent the same type of frame across languages. The frame `fbId` can be omitted, in which case the `Use on Facebook` button for that frame will not work.

### Adding the Frame Images

Add the new or updated frame images under `./frames-web/public/frames`, following the existing directory structure:

- A per-language (2-letter code) subfolder, e.g. `en`, `ru`.
- Each frame is a file named `frame-[type].png`. 

Frame files **must** be in `PNG` format, and **should** be 1440 by 1440 pixels in size. Replace `[type]` with the value specified in the configuration file.

### Testing the Changes

You can run the website locally by navigating to `./frames-web` in a terminal and running `yarn start`.
