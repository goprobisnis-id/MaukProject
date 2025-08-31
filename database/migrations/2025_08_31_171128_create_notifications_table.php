<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // 'event_registration', 'kategori_added', 'produk_added', 'event_added', etc.
            $table->string('title');
            $table->text('message');
            $table->json('data')->nullable(); // additional data
            $table->string('icon')->default('bell'); // icon name for UI
            $table->string('color')->default('blue'); // notification color
            $table->boolean('is_read')->default(false);
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
