
export class IdentityUtils {

    static getUppercaseIdentityName(identity: string): string {
        switch (identity) {
            case 'anonymous':
            case 'anonymouses':
                return 'Anonymous';
            case 'business-unit':
            case 'business-units':
                return 'BusinessUnit';
            case 'individual':
            case 'individuals':
                return 'Individual';
            case 'organization':
            case 'organizations':
                return 'Organization';
            case 'staff':
            case 'staffs':
                return 'Staff';
            default: return null
        }
    }

    static getIdentityUrlPrefix(identityType: string): string {
        switch (identityType) {
            case 'Anonymous': return 'anonymouses';
            case 'BusinessUnit': return 'business-units';
            case 'Individual': return 'individuals';
            case 'Organization': return 'organizations';
            case 'Staff': return 'staffs';
            default: return null
        }
    }

    static getPersonaUrlPrefix(identityType: string): string {
        switch (identityType) {
            case 'Anonymous': return 'anonymouse-personas';
            case 'Individual': return 'individual-personas';
            case 'Organization': return 'organization-personas';
            case 'Staff': return 'staff-personas';
            default: return null
        }
    }

    static getSingular(identityType: string): string {
        switch (identityType) {
            case 'Anonymous':
            case 'anonymouses':
                return 'anonymous';
            case 'Individual':
            case 'individuals':
                return 'individual';
            case 'Organization':
            case 'organizations':
                return 'organization';
            case 'Staff':
            case 'staffs':
                return 'staff';
            default:
                return null;
        }
    }

    static getPlural(identityType: string): string {
        switch (identityType.toLowerCase()) {
            case 'anonymous':
                return 'anonymouses';
            case 'individual':
                return 'individuals';
            case 'organization':
                return 'organizations';
            case 'staff':
                return 'staffs';
            default:
                return null;
        }
    }
}