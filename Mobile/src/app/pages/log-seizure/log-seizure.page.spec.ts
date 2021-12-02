import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LogSeizurePage } from './log-seizure.page';

describe('LogSeizurePage', () => {
    let component: LogSeizurePage;
    let fixture: ComponentFixture<LogSeizurePage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LogSeizurePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(LogSeizurePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
