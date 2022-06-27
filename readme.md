# Create a Sanctum Personal Access Tokens in Nova

This package allows you to use [Sanctum](https://laravel.com/docs/7.x/sanctum) to generate a Personal Access Tokens in [Nova](https://nova.laravel.com/).

## Screenshot

![View without any tokens](https://user-images.githubusercontent.com/22965241/175853019-a161fd10-5fde-4895-a094-26a7555f45dc.png)
![Create Token View](https://user-images.githubusercontent.com/22965241/175853009-68f7d0bc-087a-49af-bbec-2d237e0330b7.png)
![Post Create Token View](https://user-images.githubusercontent.com/22965241/175853005-466ccddb-4c25-42a0-9af0-42a4a088d249.png)
![View with single token](https://user-images.githubusercontent.com/22965241/175852995-5431d46f-daec-4831-9596-8d551a050286.png)
![Revoke Token Prompt](https://user-images.githubusercontent.com/22965241/175853279-fdd28f9c-d6ae-4abb-b769-12fc70cf2b23.png)

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
