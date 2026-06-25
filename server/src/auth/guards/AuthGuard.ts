// google.strategy.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
    Strategy,
    'google',
) {
    constructor(
        private readonly config: ConfigService,
    ) {

        super({

            clientID:
                config.getOrThrow<string>(
                    "GOOGLE_CLIENT_ID"
                ),

            clientSecret:
                config.getOrThrow<string>(
                    "GOOGLE_CLIENT_SECRET"
                ),

            callbackURL:
                config.getOrThrow<string>(
                    "GOOGLE_CALLBACK_URL"
                ),

            scope: ["email", "profile"],

        });

    }

    async validate(
        accessToken: string,

        refreshToken: string,

        profile: Profile,
    ) {
        return {
            googleId: profile.id,

            email: profile.emails?.[0].value,

            firstName: profile.name?.givenName,

            lastName: profile.name?.familyName,

            picture: profile.photos?.[0].value,
        };
    }
}

