# Create a Sanctum Personal Access Tokens in Nova

This package allows you to use [Sanctum](https://laravel.com/docs/7.x/sanctum) to generate a Personal Access Tokens in [Nova](https://nova.laravel.com/).

## Screenshot

![screenshot of providing a name](https://user-images.githubusercontent.com/22965241/84215880-92931200-aa7c-11ea-81ab-af4be89c79d3.jpg)
![screenshot of providing a name](https://user-images.githubusercontent.com/22965241/84215851-827b3280-aa7c-11ea-9acb-35b592885049.jpg)
![screenshot of providing a name](https://user-images.githubusercontent.com/22965241/84215846-8018d880-aa7c-11ea-8e35-7c3ab8d32f15.jpg)

## Prerequisites

1. [Install and Configure Sanctum](https://laravel.com/docs/7.x/sanctum#installation)
2. [Have Laravel Nova](https://nova.laravel.com/)
   - For Nova 4, use v2
   - Nova 3, use v1

## Installation

```
composer require jeffbeltran/sanctum-tokens
```

Register the plugin by adding `SanctumTokens::make()` to the array of fields in the Nova resource. Make sure the
`HasApiTokens` trait from the Sanctum package has been added to your model.

```php
use Jeffbeltran\SanctumTokens\SanctumTokens;

/**
 * Get the fields displayed by the resource.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return array
 */
public function fields(Request $request)
{
    return [
        ID::make('ID', 'id')->sortable(),
        ...
        SanctumTokens::make(),
    ];
}

```

## Features

### Hide Abilities

You can hide the reference to the token abilities from the UI by calling the `hideAbilities()` method on the field.

```php
use Jeffbeltran\SanctumTokens\SanctumTokens;

/**
 * Get the fields displayed by the resource.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return array
 */
public function fields(Request $request)
{
    return [
        ID::make('ID', 'id')->sortable(),
        ...
        SanctumTokens::make()->hideAbilities(),
    ];
}

```

### Set Default Abilities

If you don't want to use the default `*` token ability you can set your own by simply passing an array of strings to the `defaultAbilities()` method on the field.

This works well with the the `hideAbilities()` method if you want to hide the abilities logic from your users.

```php
use Jeffbeltran\SanctumTokens\SanctumTokens;

/**
 * Get the fields displayed by the resource.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return array
 */
public function fields(Request $request)
{
    return [
        ID::make('ID', 'id')->sortable(),
        ...
        SanctumTokens::make()->defaultAbilities(['foo', 'bar-baz']),
    ];
}

```

### Localization

Publish the package language files to your application's `resources/lang/vendor` directory:

```
php artisan vendor:publish --provider="Jeffbeltran\SanctumTokens\ToolServiceProvider"
```
