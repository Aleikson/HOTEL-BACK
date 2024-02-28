import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (request, response, next) => {
    try {
        const listing = await Listing.create(request.body);
        return response.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (request, response, next) => {
    const listing = await Listing.findById(request.params.id);
    if (!listing) {
        return next(errorHandler(401), 'You can only delete your own listings!');
    }
    if (request.user.id !== listing.userRef) {
    }
    try {
        await Listing.findByIdAndDelete(request.params.id);
        response.status(200).json('Listing has been deleted');
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (request, response, next) => {
    const listing = await Listing.findById(request.params.id);
    if (!listing) {
        return next(errorHandler(404), 'Listing not found!');
    }
    if (request.params.id === listing.userRef) {
        return next(errorHandler(401), 'You can only update your own listings!');
    }
    try {
        const listingUpdate = await Listing.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true }
        );
        response.status(200).json(listingUpdate);
    } catch (error) {
        next(error);
    }
};

export const getListing = async (request, response, next) => {
    try {
        const listing = await Listing.findById(request.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }
        response.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};
