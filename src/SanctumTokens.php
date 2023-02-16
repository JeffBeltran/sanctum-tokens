<?php

namespace Jeffbeltran\SanctumTokens;

use Laravel\Nova\ResourceTool;

class SanctumTokens extends ResourceTool
{
    private $defaultOptions = [
        "showAbilities" => true,
        "defaultAbilities" => "*",
        "displayAbilitiesType" => "inline",
        "abilitiesAvailable" => [],
    ];

    public function __construct()
    {
        parent::__construct();

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
            "defaultAbilities" => $abilities,
        ]);
    }

    /**
     * This will list all available abilities
     *
     * @return $this
     */
    public function abilitiesAvailable(array $abilitiesAvailable)
    {
        return $this->withMeta([
            "abilitiesAvailable" => $abilitiesAvailable,
        ]);
    }

    public function displayAbilitiesType(string $type = 'inline')
    {
        return $this->withMeta([
            "displayAbilitiesType" => $type,
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
