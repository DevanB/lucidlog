<?php

$providers = [
    App\Providers\AppServiceProvider::class,
    App\Providers\FortifyServiceProvider::class,
];

// Only register Telescope in local or staging environments
if (in_array(env('APP_ENV'), ['local', 'staging'])) {
    $providers[] = App\Providers\TelescopeServiceProvider::class;
}

return $providers;
