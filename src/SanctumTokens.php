<?php

namespace Jeffbeltran\SanctumTokens;

use Laravel\Nova\ResourceTool;

class SanctumTokens extends ResourceTool
{
    /**
     * Get the displayable name of the resource tool.
     *
     * @return string
     */
    public function name()
    {
        return 'Sanctum Tokens';
    }

    /**
     * Get the component name for the resource tool.
     *
     * @return string
     */
    public function component()
    {
        return 'sanctum-tokens';
    }
}
