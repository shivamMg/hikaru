## Hikaru

![hikaru](/data/hikaru.png?raw=true)

Projects Showcase Gallery for peeps at [Devup](http://devup.in)

This project is a fork of Shivam Mamgain's [Hikaru](https://github.com/shivammg/hikaru). This project does not make use of the naka backend API like the original but instead, relies on reading project data from a JS File.

![screenshot](/data/screenshot.png?raw=true)

# Adding a Project to the Gallery
To list your project in the gallery, follow these steps.

1. Fork this repo.
2. Open `src/data/projects.js`
3. Add your project's info in the below format
    ```
    {
        "id": 1,
        "name": "Diomedes",
        "description": "Email alerts for your favorite movies about to hit theaters",
        "sourceLink": "https://github.com/ArionMiles/diomedes",
        "websiteLink": "https://diomedes.in",
        "author": "Kanishk Singh",
        "authorLink": "https://arionmiles.me/",
        "creator": "ArionMiles",
        "tags": ['python', 'django'],
        "photo": 'diomedes.png'
    }
    ```

    - Increment the `"id"` value of your project entry from the previous entry's value by one.
    - If you do not wish to display an image in the project card, set the `"photo"` value to `null`.
4. If you add an image, then set the image name as the `"photo"` value and add that image to `/src/data/project_images` directory.
    **NOTE:** The images must have dimensions `1024x420px`.
5. Commit and push these changes to your fork.
6. Create a Pull Request into this repo.

# License
GPL3