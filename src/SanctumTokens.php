<?php

namespace Jeffbeltran\SanctumTokens;

use Laravel\Nova\ResourceTool;

class SanctumTokens extends ResourceTool
{
    private $defaultOptions = [
        "showAbilities" => true,
        "defaultAbilities" => "*",
        "defaultExpirationDuration" => null,
    ];

    public function __construct()
    {
        parent::__construct();

        $this->defaultOptions['defaultExpirationDuration'] = config('sanctum.expiration');
        return $this->withMeta($this->defaultOptions);
    }

    /**
     * Get the displayable name of the resource tool.
     *
     * @return string
     */
    public function name()
    {
        return "Sanctum Tokens";
    }

    /**
     * This will hide the references to abilities from the UI.
     *
     * @return $this
     */
    public function hideAbilities()
    {
        return $this->withMeta([
            "showAbilities" => false,
        ]);
    }

    /**
     * This will hide the references to abilities from the UI.
     *
     * @return $this
     */
    public function defaultAbilities(array $abilities)
    {
        return $this->withMeta([
            "defaultAbilities" => implode(", ", $abilities),
        ]);
    }

    /**
     * Get the component name for the resource tool.
     *
     * @return string
     */
    public function component()
    {
        return "SanctumTokens";
    }
}
