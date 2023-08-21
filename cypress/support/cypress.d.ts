declare namespace Cypress {
  interface Chainable<Subject> {
    // common commands
    clickItemAndVerifyIfOtherAreCollapsed(item: string): Chainable<any>;
    closeAllItemInOneAccordion(accordion: string): Chainable<any>;
    findByDataCy(selector: string, options?: any): Chainable<any>;

    // accordion commands
    getByDataCy(selector: string, options?: any): Chainable<any>;
    navigateToNextStep(): Chainable<any>;
    openAllItemInOneAccordion(accordion: string): Chainable<any>;

    // stepper commands
    selectFormFromMenu(firsOption: string, secondaryOption: string): Chainable<any>;
    verifyContent(firstParagraph: string, secondParagraph: string): Chainable<any>;
    verifyTitle(title: string): Chainable<any>;
  }
}
