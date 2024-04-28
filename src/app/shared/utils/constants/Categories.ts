import { Category } from '../../models/enum/Category';
import { Gender } from '../../models/enum/Gender';
import { Subcategory } from '../../models/enum/Subcategory';

export const Categories = [
    {
        id: 1,
        name: Category.FASHION,
        subCategories: [
            {
                id: 1,
                name: Subcategory.TOPS,
                gender: [Gender.FEMALE, Gender.MALE, Gender.UNISEX],
            },
            {
                id: 2,
                name: Subcategory.BOTTOMS,
                gender: [Gender.FEMALE, Gender.MALE, Gender.UNISEX],
            },
            { id: 3, name: Subcategory.SHOES },
            { id: 4, name: Subcategory.COAT },
            { id: 5, name: Subcategory.ACCESSORIES },
            { id: 6, name: Subcategory.OTHER_FASHION },
        ],
    },
    {
        id: 2,
        name: Category.ELECTRONICS,
        subCategories: [
            { id: 7, name: Subcategory.COMPUTER },
            { id: 8, name: Subcategory.PHONE },
            { id: 9, name: Subcategory.VIDEO_GAMES },
            { id: 10, name: Subcategory.OTHER_ELECTRONICS },
        ],
    },
    {
        id: 3,
        name: Category.HOME,
        subCategories: [
            { id: 11, name: Subcategory.FURNITURE },
            { id: 12, name: Subcategory.DECORATIONS },
            { id: 13, name: Subcategory.GARDEN },
            { id: 14, name: Subcategory.OTHER_HOME },
        ],
    },
    {
        id: 4,
        name: Category.LEISURE,
        subCategories: [
            { id: 15, name: Subcategory.BOOKS },
            { id: 16, name: Subcategory.MUSIC },
            { id: 17, name: Subcategory.MOVIES },
            { id: 18, name: Subcategory.SPORT },
            { id: 19, name: Subcategory.OTHER_LEISURE },
        ],
    },
    {
        id: 5,
        name: Category.OTHER_CATEGORY,
        subCategories: [{ id: 20, name: Subcategory.OTHER_SUBCATEGORY }],
    },
];
