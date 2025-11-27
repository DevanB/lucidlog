<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\Set\ValueObject\SetList;
use RectorLaravel\Set\LaravelSetList;

return RectorConfig::configure()
    ->withPaths([
        __DIR__.'/app',
        __DIR__.'/config',
        __DIR__.'/database',
        __DIR__.'/routes',
        __DIR__.'/tests',
    ])
    ->withSkip([
        // Standard exclusion paths
        __DIR__.'/vendor',
        __DIR__.'/node_modules',
        __DIR__.'/storage',
        __DIR__.'/bootstrap/cache',
        __DIR__.'/public/build',

        // Generated files - skip Wayfinder actions and IDE helpers
        __DIR__.'/resources/js/actions',
        __DIR__.'/resources/js/types/generated.d.ts',
        '**/_ide_helper.php',
        '**/.phpstorm.meta.php',
    ])
    ->withSets([
        // PHP 8.4 rule set
        SetList::PHP_84,

        // Laravel 12 rule set - using driftingly/rector-laravel
        LaravelSetList::LARAVEL_120,
    ])
    ->withTypeCoverageLevel(5);
