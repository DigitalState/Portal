import isArray from 'lodash/isArray';
import { IdentityUtils } from '../../shared/utils/identity.utils';

export class LocalApiUtils {

    /**
     *
     * @param uri
     * @return {{uuid: string, entityPrefix: string}}
     */
    static explodeUri(uri: string): { entityPrefix: string, uuid: string } {
        const exploded = uri.split('/');

        if (isArray(exploded) && exploded.length >= 2) {
            return {
                uuid: exploded[exploded.length - 1],
                entityPrefix: exploded[exploded.length - 2],
            };
        }
        else {
            throw 'Not a valid URI array';
        }
    }

    /**
     *
     * @param entityPrefix
     * @param uuid
     * @return {{routerLink: Array, title: null}}
     */
    static createEntityLink(entityPrefix: string, uuid: string, title?: string): { routerLink: Array<string>, title: any } {
        let link = {
            routerLink: [],
            title: title ? title : uuid,
        };

        switch (entityPrefix) {
            case 'scenario': entityPrefix = 'scenarios';
            case 'scenarios':
            case 'submission': entityPrefix = 'submissions';
            case 'submissions':
                link.routerLink = ['/pages', 'services', entityPrefix, uuid, 'show'];
                break;
            case 'case-statuses':
                // @Todo Implement case statuses link by changing the route to the case-status component in a similar way to how scenarios are implemented
                alert('Case Statuses link is not implemented yet.');
                link.routerLink = ['/pages', 'cases', entityPrefix, uuid, 'show'];
                break;
            case 'individuals':
            case 'staffs':
            case 'anonymouses':
                link.routerLink = ['/pages', 'identities', entityPrefix, uuid, 'show'];
                break;
            case 'user': entityPrefix = 'users';
            // case 'users':
            //     link.routerLink = ['/pages', entityPrefix, uuid, 'show'];
            //     break;
            default:
                link.routerLink = ['/pages', entityPrefix, uuid, 'show'];
                break;
        }

        return link;
    }

    /**
     * Generates a Router Link to an entity's `show` component from a URI.
     *
     * @param uri
     * @returns {{routerLink: Array, title: null}}
     */
    static createEntityLinkFromUri(uri: string): { routerLink: Array<string>, title: any } {
        let explodedUri = LocalApiUtils.explodeUri(uri);
        return LocalApiUtils.createEntityLink(explodedUri.entityPrefix, explodedUri.uuid);
    }

    /**
     * Generates a Router Link to an Identity's entity `show` component.
     *
     * @param identity One of the known identity values (individual, staff, etc..)
     * @param identityUuid the UUID of the identity
     * @returns {{routerLink: Array, title: null}}
     */
    static createIdentityEntityLink(identity: string, identityUuid: string): { routerLink: Array<string>, title: any } {
        const identityPlural = IdentityUtils.getIdentityUrlPrefix(identity);

        if (!identityPlural) {
            return null;
        }

        let link = {
            routerLink: ['/pages', 'identities', identityPlural, identityUuid, 'show'],
            title: null,
        };

        return link;
    }

}