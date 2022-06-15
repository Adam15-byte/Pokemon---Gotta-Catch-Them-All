# Pokedex, Pokemon - Gotta Catch Them All
Try to catch all 151 Pokemon in this simple App / Game made in React Native.

App is made for private, non-commercial purposes. Pokemon IP was chosen because of free APIs with detailed information about each Pokemon.

## Table of contents
* [General info](#general-info)
* [Technologies](#Technologies)
* [Videos](#Videos)
* [Further improvments](#Further-improvments)

## General info
The idea for the App came after intensive thinking about an app that could constantly call on APIs to get data asynchronously, possibly a free API.

The list of 151 Pokemon names is stored locally, however, every time the pokedex closes, the function to get detailed info asynchronously is called.

Pokemon Searching has randomized length, by firing setInterval and generating a random number. Attempting to catch a Pokemon also does a similar chance check, by generating a random number and checking if it is withing a specific range.

Pokedex and Pokeball are operated by drag gestures thanks to PanGestureHandler.

## Technologies
* Async fetch
* Redux toolkit
* Reanimated 2
* Hooks: useEffect, useState, useCallback

## Videos
https://user-images.githubusercontent.com/64642323/169338563-ccdb2a40-d905-42b1-8c50-a88575cff224.mp4

## Further improvments
* The API used in the App offers much more data on each pokemon, including their attacks. It is possible in the future, to implement pokemon battles.
* Module to browse collected Pokemon.
* AsyncStorage of Pokemon collection.
* Separator line inside catching component works, but needs reworking.