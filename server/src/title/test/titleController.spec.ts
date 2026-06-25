import { Test, TestingModule } from '@nestjs/testing';
import { TitleController } from '../controller/title.controller';
import { TitleService } from '../title.service';

describe('TitleController', () => {

    let controller: TitleController;

    const mockTitleService = {

        getTitleById: jest.fn(),

        getTitleCredits: jest.fn(),

        getTitleGenres: jest.fn(),

        getTitleImages: jest.fn(),

        getTitleVidoes: jest.fn(),

        getTitleReviews: jest.fn(),

    };

    beforeEach(async () => {

        jest.clearAllMocks();

        const module: TestingModule =
            await Test.createTestingModule({

                controllers: [TitleController],

                providers: [

                    {
                        provide: TitleService,
                        useValue: mockTitleService,
                    }

                ]

            }).compile();

        controller = module.get(TitleController);

    });



    it('should return title by id', async () => {

        const title = {

            id: 'uuid',

            name: 'Breaking Bad'

        };

        mockTitleService
            .getTitleById
            .mockResolvedValue(title);

        const result = await controller.getTitleById('uuid');

        expect(result).toEqual(title);

        expect(mockTitleService.getTitleById)
            .toHaveBeenCalledWith('uuid');

    });

    it('should return genres', async () => {

        const genres = [

            { id: 1, name: 'Action' },

            { id: 2, name: 'Drama' }

        ];

        mockTitleService
            .getTitleGenres
            .mockResolvedValue(genres);

        const result =
            await controller.getTitleGenres('uuid');

        expect(result).toEqual(genres);

        expect(mockTitleService.getTitleGenres)
            .toHaveBeenCalledWith('uuid');

    });

    it('should return title credits', async () => {

        const credits = {

            data: [

                {

                    id: 1,

                    name: 'Bryan Cranston'

                }

            ]

        };

        mockTitleService
            .getTitleCredits
            .mockResolvedValue(credits);

        const result =
            await controller.getTitleCredits(

                'uuid',

                'Actor',

                1,

                20,

                'job',

                'asc'

            );

        expect(result).toEqual(credits);

        expect(mockTitleService.getTitleCredits)
            .toHaveBeenCalledWith(

                'uuid',

                'Actor',

                1,

                20,

                'job',

                'asc'

            );

    });
    it('should return title view', async () => {

        mockTitleService
            .getTitleById
            .mockResolvedValue({

                id: 'uuid',

                name: 'Breaking Bad'

            });

        mockTitleService
            .getTitleCredits

            .mockResolvedValueOnce({

                data: [

                    {

                        name: 'Bryan Cranston'

                    }

                ]

            })

            .mockResolvedValueOnce({

                data: [

                    {

                        name: 'Vince Gilligan'

                    }

                ]

            });

        mockTitleService
            .getTitleGenres

            .mockResolvedValue([

                {

                    name: 'Drama'

                }

            ]);

        const result =
            await controller.getTitleView('uuid');

        expect(result).toEqual({

            details: {

                id: 'uuid',

                name: 'Breaking Bad'

            },

            actors: [

                {

                    name: 'Bryan Cranston'

                }

            ],

            directors: [

                {

                    name: 'Vince Gilligan'

                }

            ],

            genres: [

                {

                    name: 'Drama'

                }

            ]

        });

    });

    
});