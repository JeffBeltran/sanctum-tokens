# Create a Sanctum Personal Access Tokens in Nova

This package allows you to use [Sanctum](https://laravel.com/docs/7.x/sanctum) to generate a Personal Access Tokens in [Nova](https://nova.laravel.com/).

## Screenshot

![screenshot of providing a name](https://user-images.githubusercontent.com/22965241/84215880-92931200-aa7c-11ea-81ab-af4be89c79d3.jpg)
![screenshot of providing a name](https://user-images.githubusercontent.com/22965241/84215851-827b3280-aa7c-11ea-9acb-35b592885049.jpg)
![screenshot of providing a name](https://user-images.githubusercontent.com/22965241/84215846-8018d880-aa7c-11ea-8e35-7c3ab8d32f15.jpg)

## Prerequisites

1. [Install and Configure Sanctum](https://laravel.com/docs/7.x/sanctum#installation)
2. [Have Laravel Nova](https://nova.laravel.com/)

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

## Other Info

This is super basic plugin at the moment, I just needed a quick way to generate a Sanctum token from Nova. This does not allow or support other features that Sanctum does, however ,if there is a want/need from other people i'll get more functionality added.
