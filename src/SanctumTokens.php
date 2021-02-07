<?php

namespace Jeffbeltran\SanctumTokens;

use Laravel\Nova\ResourceTool;

class SanctumTokens extends ResourceTool
{
    private $defaultOptions = [
        "showAbilities" => true,
        "defaultAbilities" => "*",
    ];

    public function __construct()
    {
        parent::__construct();

        $this->meta["options"] = $this->defaultOptions;
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

    private function updateOption(array $value)
    {
        $this->meta["options"] = array_merge($this->meta["options"], $value);
        return $this;
    }

    /**
     * This will hide the references to abilities from the UI
     *
     * @return $this
     */
    public function hideAbilities()
    {
        return $this->updateOption([
            "showAbilities" => false,
        ]);
    }

    /**
     * This will hide the references to abilities from the UI
     *
     * @return $this
     */
    public function defaultAbilities(array $abilities)
    {
        return $this->updateOption([
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
        return "sanctum-tokens";
    }
}
